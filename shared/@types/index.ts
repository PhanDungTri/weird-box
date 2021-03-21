import { PASSIVE_ACTION, SPELL_NAME } from "../constants";

export type GameSettings = {
  maxHP: number;
  timePerTurn: number;
};

export type HitPointChange = {
  target: string;
  hp: number;
};

export type SpellInfo = {
  id: string;
  name: SPELL_NAME;
  power: number;
  duration: number;
  target: string;
};

export type PassiveAction = {
  id: string;
  action: PASSIVE_ACTION;
  target: string;
};

export type CardInfo = {
  id: string;
  power: number;
  spell: SPELL_NAME;
};
