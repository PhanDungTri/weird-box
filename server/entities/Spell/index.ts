import { SpellInfo } from "../../../shared/@types";
import { SPELL_NAME } from "../../../shared/constants";
import { generateUniqueId } from "../../../shared/utils";
import Player from "../Player";

const debuffs = [SPELL_NAME.Poison, SPELL_NAME.Punch];

abstract class Spell {
  protected strength = 0;
  public readonly id: string;

  constructor(
    public readonly name: SPELL_NAME,
    protected target: Player,
    protected caster: Player,
    protected duration = 0
  ) {
    this.id = generateUniqueId();
  }

  public abstract trigger(): Promise<void>;

  public getStrength(): number {
    return this.strength;
  }

  public getDuration(): number {
    return this.duration;
  }

  public getCaster(): Player {
    return this.caster;
  }

  public setTarget(target: Player): void {
    this.target = target;
  }

  public setCaster(caster: Player): void {
    this.caster = caster;
  }

  public setStrength(strength: number): void {
    this.strength = strength;
  }

  public isDebuff(): boolean {
    return debuffs.includes(this.name);
  }

  public toJsonData(): SpellInfo {
    return {
      id: this.id,
      name: this.name,
      strength: this.strength,
      duration: this.duration,
      target: this.target.id,
    };
  }
}

export default Spell;
