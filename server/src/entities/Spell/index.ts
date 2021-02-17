import { ISpell } from "../../../../shared/src/interfaces/Spell";
import { SPELL_NAME } from "../../../../shared/src/interfaces/Spell";
import generateUniqueId from "../../utilities/generateUniqueId";
import Player from "../Player";

const debuffs = [SPELL_NAME.Poison, SPELL_NAME.Punch];

abstract class Spell {
  protected power = 0;
  public readonly id: string;

  constructor(
    public readonly name: SPELL_NAME,
    protected target: Player,
    protected caster: Player,
    protected duration = 0
  ) {
    this.id = generateUniqueId();
  }

  public abstract trigger(): void;

  public getPower(): number {
    return this.power;
  }

  public getDuration(): number {
    return this.duration;
  }

  public getCaster(): Player {
    return this.caster;
  }

  public isDebuff(): boolean {
    return debuffs.includes(this.name);
  }

  public toJsonData(): ISpell {
    return {
      id: this.id,
      name: this.name,
      power: this.power,
      duration: this.duration,
      target: this.target.getClient().id,
    };
  }
}

export default Spell;
