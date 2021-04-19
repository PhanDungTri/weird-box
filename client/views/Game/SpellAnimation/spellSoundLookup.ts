import { Howl } from "howler";
import { SPELL_NAME, PASSIVE_ACTION } from "../../../../shared/constants";
import PunchSound from "../../../assets/sounds/punch.mp3";
import PoisonSound from "../../../assets/sounds/poison.mp3";
import HealSound from "../../../assets/sounds/heal.mp3";
import WhooshSound from "../../../assets/sounds/whoosh.mp3";
import ShieldSound from "../../../assets/sounds/shield.mp3";
import ReflectSound from "../../../assets/sounds/mirror_reflect.mp3";
import BlockSound from "../../../assets/sounds/shield_block.mp3";
import ShieldBreakSound from "../../../assets/sounds/shield_break.mp3";
import MirrorSound from "../../../assets/sounds/mirror.mp3";
import MirrorCrackSound from "../../../assets/sounds/mirror_crack.mp3";

const spellSoundLookup: Partial<Record<SPELL_NAME | PASSIVE_ACTION, Record<number, () => void>>> = {
  [SPELL_NAME.Punch]: {
    1: () => new Howl({ src: [WhooshSound] }).play(),
    3: () => new Howl({ src: [PunchSound] }).play(),
  },
  [SPELL_NAME.Poison]: {
    1: () => new Howl({ src: [PoisonSound] }).play(),
  },
  [SPELL_NAME.Heal]: {
    1: () => new Howl({ src: [HealSound] }).play(),
  },
  [SPELL_NAME.Shield]: {
    1: () => new Howl({ src: [ShieldSound] }).play(),
  },
  [SPELL_NAME.Mirror]: {
    1: () => new Howl({ src: [MirrorSound] }).play(),
  },
  [PASSIVE_ACTION.Reflect]: {
    3: () => new Howl({ src: [ReflectSound] }).play(),
  },
  [PASSIVE_ACTION.Block]: {
    1: () => new Howl({ src: [BlockSound] }).play(),
  },
  [PASSIVE_ACTION.ShieldPierce]: {
    1: () => new Howl({ src: [ShieldBreakSound] }).play(),
  },
  [PASSIVE_ACTION.MirrorPierce]: {
    1: () => new Howl({ src: [MirrorCrackSound] }).play(),
  },
};

export default spellSoundLookup;
