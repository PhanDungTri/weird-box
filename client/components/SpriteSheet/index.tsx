import { memo, useEffect } from "react";
import Sprite, { SpriteProps } from "../Sprite";
import { spriteSheetStyle } from "./styles";

type SpriteSheetProps = SpriteProps & {
  steps: number;
  fps?: number;
  loop?: boolean;
  onReachFrame?: Record<number, () => void>;
};

const SpriteSheet = ({
  steps,
  fps = 12,
  loop = false,
  onReachFrame,
  ...spriteProps
}: SpriteSheetProps): JSX.Element => {
  useEffect(() => {
    const timeouts: number[] = [];
    const frameTime = (1 / fps) * 1000;

    for (const key in onReachFrame) {
      const frame = parseInt(key);
      if (frame > 0 && frame <= steps) timeouts.push(window.setTimeout(onReachFrame[frame], frameTime * (frame - 1)));
    }

    return () => timeouts.forEach((t) => clearTimeout(t));
  }, [steps, fps, onReachFrame]);

  return (
    <Sprite
      css={spriteSheetStyle(steps, fps, loop, spriteProps.size[0] * (spriteProps.scale || 1) * steps)}
      {...spriteProps}
    />
  );
};

export default memo(SpriteSheet);
