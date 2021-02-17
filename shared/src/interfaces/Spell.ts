enum SPELL_NAME {
  Punch = "punch",
  Poison = "poison",
  Heal = "heal",
  Void = "void",
  Shield = "shield",
}

enum PASSIVE_ACTION {
  Block = "block",
  Pierce = "pierce",
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

export { ISpell, SPELL_NAME, PASSIVE_ACTION, IPassiveAction };
