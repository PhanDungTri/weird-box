import Player from ".";
import { EventsFromServer } from "../../../shared/@types";
import { SERVER_EVENT_NAME } from "../../../shared/constants";
import { waitFor } from "../../utilities";
import Spell from "../Spell";
import PassiveSpell from "../Spell/PassiveSpell";

class SpellManager {
  private debuffs: Spell[] = [];
  private talismans: PassiveSpell[] = [];

  constructor(
    private player: Player,
    private broadcast: (ev: SERVER_EVENT_NAME, ...data: Parameters<EventsFromServer[SERVER_EVENT_NAME]>) => void
  ) {}

  private addTalisman(talisman: PassiveSpell): void {
    this.talismans.push(talisman);
    this.player.socket.emit(SERVER_EVENT_NAME.TakeSpell, talisman.toJsonData());
  }

  private async activateTalisman(spell: Spell): Promise<boolean> {
    if (this.talismans.length > 0 && spell.isDebuff()) {
      const talisman = this.talismans[0];
      this.talismans = this.talismans.filter((t) => t !== talisman);

      for await (const action of talisman.activate(spell)) {
        this.broadcast(SERVER_EVENT_NAME.ActivatePassive, {
          id: talisman.id,
          target: this.player.id,
          action,
        });

        await waitFor(1000);
      }

      return true;
    }

    return false;
  }

  public async triggerPendingDebuffs(): Promise<void> {
    for (const debuff of this.debuffs) {
      await debuff.trigger();
      if (debuff.getDuration() === 0) this.debuffs = this.debuffs.filter((d) => d !== debuff);
      this.broadcast(SERVER_EVENT_NAME.TakeSpell, debuff.toJsonData());
      await waitFor(1000);
    }
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
