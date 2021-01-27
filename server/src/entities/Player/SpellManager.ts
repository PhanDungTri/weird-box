import Debuff from "../Spell/Debuff";
import Spell from "../Spell";

class SpellManager {
  private debuffs: Debuff[] = [];

  public countDebuffs(): number {
    return this.debuffs.length;
  }

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
      if (debuff.getDuration() <= 0) this.removeDebuff(debuff);
      yield debuff;
    }
  }

  public purify(): void {
    this.debuffs = [];
  }
}

export default SpellManager;
