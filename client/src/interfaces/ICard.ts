import { SPELL_NAME } from "../../../shared/src/interfaces/Spell";

interface ICard {
  id: string;
  powerPoint: number;
  spell: SPELL_NAME;
}

export default ICard;
