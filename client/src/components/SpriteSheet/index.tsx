import { useEffect } from "react";
import Sprite, { SpriteProps } from "../Sprite";
import { spriteSheetStyle } from "./styles";

type SpriteSheetProps = SpriteProps & {
  steps: number;
  fps?: number;
  loop?: boolean;
  onDone?: () => void;
};

const SpriteSheet = ({ steps, fps = 24, loop = false, onDone, ...spriteProps }: SpriteSheetProps): JSX.Element => {
  useEffect(() => {
    let doneTimeout: number;
    if (onDone && !loop) doneTimeout = setTimeout(onDone, (steps / fps) * 1000);
    return () => {
      if (doneTimeout) clearTimeout(doneTimeout);
    };
  }, []);

  return (
    <Sprite
      css={spriteSheetStyle(steps, fps, loop, spriteProps.size[0] * (spriteProps.scale || 1) * steps)}
      {...spriteProps}
    />
  );
};

export default SpriteSheet;
