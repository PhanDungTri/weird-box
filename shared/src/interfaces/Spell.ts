import SPELL_NAME from "../SpellName";

interface ISpell {
  id: string;
  name: SPELL_NAME;
  power: number;
  duration: number;
  target: string;
}

export { ISpell };
