import Debuff from "./spells/Debuff";
import Spell from "./spells/Spell";

class SpellManager {
  private debuffs: Debuff[] = [];

  public takeSpell(spell: Spell): void {
    if (spell instanceof Debuff) {
      this.debuffs.push(spell);
    } else {
      spell.trigger();
    }
  }

  public removeDebuff(debuff: Spell): void {
    this.debuffs = this.debuffs.filter((d) => d !== debuff);
  }

  public *triggerDebuffs(): Generator<Debuff, void, unknown> {
    for (const debuff of this.debuffs) {
      debuff.trigger();
      yield debuff;
    }
  }

  public purify(): void {
    this.debuffs = [];
  }
}
