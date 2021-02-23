import Player from ".";
import SOCKET_EVENT from "../../../../shared/src/SocketEvent";
import Broadcaster from "../Game/Broadcaster";
import Spell from "../Spell";
import PassiveSpell from "../Spell/PassiveSpell";

class SpellManager {
  private debuffs: Spell[] = [];
  private talismans: PassiveSpell[] = [];
  private curses: PassiveSpell[] = [];

  constructor(private player: Player, private boardcaster: Broadcaster) {}

  public async triggerPendingDebuffs(): Promise<void> {
    for (const debuff of this.debuffs) {
      await debuff.trigger();
      if (debuff.getDuration() === 0) this.debuffs = this.debuffs.filter((d) => d !== debuff);
      await this.boardcaster.dispatchTakeSpell(debuff.toJsonData());
    }
  }

  private addTalisman(talisman: PassiveSpell): void {
    this.talismans.push(talisman);
    this.player.getClient().send(SOCKET_EVENT.TakeSpell, [talisman.toJsonData()]);
  }

  private async activateTalisman(spell: Spell): Promise<boolean> {
    if (this.talismans.length > 0 && spell.isDebuff()) {
      const talisman = this.talismans[0];
      this.talismans = this.talismans.filter((t) => t !== talisman);

      const talismanActivator = talisman.activate(spell);
      let res = await talismanActivator.next();

      while (!res.done) {
        await this.boardcaster.dispatchTriggerPassive({
          id: talisman.id,
          target: this.player.getClient().id,
          action: res.value,
        });
        res = await talismanActivator.next();
      }
      return true;
    }

    return false;
  }

  public async takeSpell(spell: Spell): Promise<void> {
    if (!(await this.activateTalisman(spell))) {
      if (spell.getDuration() === 0) await spell.trigger();
      else if (spell.isDebuff()) {
        if (spell instanceof PassiveSpell) this.curses.push(spell);
        else this.debuffs.push(spell);
      } else return this.addTalisman(spell as PassiveSpell);

      await this.boardcaster.dispatchTakeSpell(spell.toJsonData());
    }
  }
}

export default SpellManager;
