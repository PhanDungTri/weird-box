import IconSprites from "url:../assets/sprites/icons.png";
import { SPELL_NAME } from "../../shared/constants";
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
  | "bubble_text"
  | "smiley"
  | SPELL_NAME;

const SIZE = [24, 24] as [number, number];

type IconProps = Omit<SpriteProps, "src" | "size" | "row"> & {
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
  "bubble_text",
  "smiley",
];

const Icon = ({ name, children, ...props }: IconProps): JSX.Element => {
  return (
    <Sprite src={IconSprites} size={SIZE} {...props} row={SPRITE_POS.indexOf(name)}>
      {children}
    </Sprite>
  );
};

export default Icon;
