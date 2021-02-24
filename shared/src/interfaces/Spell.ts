enum SPELL_NAME {
  Punch = "punch",
  Poison = "poison",
  Heal = "heal",
  Void = "void",
  Shield = "shield",
  Mirror = "mirror",
}

enum PASSIVE_ACTION {
  Block = "block",
  ShieldPierce = "shield pierce",
  Reflect = "reflect",
  MirrorPierce = "mirror pierce",
}

interface ISpell {
  id: string;
  name: SPELL_NAME;
  power: number;
  duration: number;
  target: string;
}

interface IPassiveAction {
  id: string;
  action: PASSIVE_ACTION;
  target: string;
}

export { SPELL_NAME, PASSIVE_ACTION };
export type { ISpell, IPassiveAction };
