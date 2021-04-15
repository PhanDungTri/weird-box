import Player from ".";
import { EventsFromServer } from "../../../shared/@types";
import { SERVER_EVENT_NAME } from "../../../shared/constants";
import waitFor from "../../utilities/waitFor";
import Spell from "../Spell";
import PassiveSpell from "../Spell/PassiveSpell";

class SpellManager {
  private debuffs: Spell[] = [];
  private talismans: PassiveSpell[] = [];

  constructor(
    private player: Player,
    private broadcast: (ev: SERVER_EVENT_NAME, ...data: Parameters<EventsFromServer[SERVER_EVENT_NAME]>) => void
  ) {}

  public async triggerPendingDebuffs(): Promise<void> {
    for (const debuff of this.debuffs) {
      await debuff.trigger();
      if (debuff.getDuration() === 0) this.debuffs = this.debuffs.filter((d) => d !== debuff);
      this.broadcast(SERVER_EVENT_NAME.TakeSpell, debuff.toJsonData());
      await waitFor(1000);
    }
  }

  private addTalisman(talisman: PassiveSpell): void {
    this.talismans.push(talisman);
    this.player.getClient().getSocket().emit(SERVER_EVENT_NAME.TakeSpell, talisman.toJsonData());
  }

  private async activateTalisman(spell: Spell): Promise<boolean> {
    if (this.talismans.length > 0 && spell.isDebuff()) {
      const talisman = this.talismans[0];
      this.talismans = this.talismans.filter((t) => t !== talisman);

      const talismanActivator = talisman.activate(spell);
      let res = await talismanActivator.next();

      while (!res.done) {
        this.broadcast(SERVER_EVENT_NAME.ActivatePassive, {
          id: talisman.id,
          target: this.player.getClient().id,
          action: res.value,
        });

        await waitFor(1000);
        res = await talismanActivator.next();
      }

      return true;
    }

    return false;
  }

  public async takeSpell(spell: Spell): Promise<void> {
    if (!(await this.activateTalisman(spell))) {
      if (spell.getDuration() === 0) await spell.trigger();
      else if (spell.isDebuff()) this.debuffs.push(spell);
      else return this.addTalisman(spell as PassiveSpell);

      this.broadcast(SERVER_EVENT_NAME.TakeSpell, spell.toJsonData());
      await waitFor(1000);
    }
  }
}

export default SpellManager;
