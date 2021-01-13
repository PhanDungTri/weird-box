import SPELL_NAME from "../../../../shared/src/SpellName";
import { ISpell } from "../../../../shared/src/interfaces/Spell";
import Player from "../Player";
import Spell from "./Spell";

abstract class Debuff extends Spell {
  constructor(name: SPELL_NAME, target: Player, caster: Player, duration: number) {
    super(name, target, caster, duration);
  }

  public getDuration(): number {
    return this.duration;
  }

  public toJsonData(): ISpell {
    return {
      ...super.toJsonData(),
      duration: this.duration,
    };
  }
}

export default Debuff;
