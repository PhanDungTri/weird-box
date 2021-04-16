import { Howl } from "howler";
import { SPELL_NAME, PASSIVE_ACTION } from "../../../../shared/constants";
import PunchSound from "../../../assets/sounds/punch.mp3";

const spellSoundLookup: Partial<Record<SPELL_NAME | PASSIVE_ACTION, Howl>> = {
  [SPELL_NAME.Punch]: new Howl({ src: [PunchSound], volume: 0.5 }),
};

export default spellSoundLookup;
