import { SPELL_NAME } from "../../shared/constants";
import IconSprites from "url:../assets/sprites/icons.png";
import { SpriteProps } from "../types";
import Sprite from "./Sprite";

type IconName =
  | "deck"
  | "triangle"
  | "gamepad"
  | "key"
  | "exit"
  | "sleep_bubble"
  | "charge"
  | "consume"
  | "cog"
  | "sound"
  | "music"
  | "book"
  | "vnFlag"
  | "usFlag"
  | "info"
  | SPELL_NAME;

const SIZE = [24, 24] as [number, number];

type IconProps = Omit<SpriteProps, "src" | "size"> & {
  name: IconName;
};

const SPRITE_POS: IconName[] = [
  "charge",
  "consume",
  SPELL_NAME.Heal,
  SPELL_NAME.Mirror,
  SPELL_NAME.Poison,
  SPELL_NAME.Punch,
  SPELL_NAME.Shield,
  "deck",
  "triangle",
  "gamepad",
  "key",
  "exit",
  "sleep_bubble",
  "cog",
  "sound",
  "music",
  "book",
  "vnFlag",
  "usFlag",
  "info",
];

const Icon = ({ name, ...props }: IconProps): JSX.Element => {
  return <Sprite src={IconSprites} size={SIZE} {...props} row={SPRITE_POS.indexOf(name)} />;
};

export default Icon;
