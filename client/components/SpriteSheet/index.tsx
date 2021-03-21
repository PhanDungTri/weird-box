import { memo } from "react";
import Sprite, { SpriteProps } from "../Sprite";
import { spriteSheetStyle } from "./styles";

type SpriteSheetProps = SpriteProps & {
  steps: number;
  fps?: number;
  loop?: boolean;
};

const SpriteSheet = ({ steps, fps = 12, loop = false, ...spriteProps }: SpriteSheetProps): JSX.Element => {
  return (
    <Sprite
      css={spriteSheetStyle(steps, fps, loop, spriteProps.size[0] * (spriteProps.scale || 1) * steps)}
      {...spriteProps}
    />
  );
};

export default memo(SpriteSheet);
