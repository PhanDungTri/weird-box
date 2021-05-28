import { css } from "@emotion/react";
import { memo, useEffect, useState } from "react";
import { SpriteProps } from "../../types";
import { spriteSheetStyle } from "./styles";

const Sprite = ({
  size: [width, height],
  src,
  onReachFrame,
  scale = 1,
  row = 0,
  fps = 12,
  steps = 1,
  loop = false,
  stop = false,
  ...props
}: SpriteProps): JSX.Element => {
  const [naturalWidth, setNaturalWidth] = useState(0);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setNaturalWidth(img.naturalWidth);
  }, []);

  useEffect(() => {
    if (!stop && onReachFrame) {
      const timeouts: number[] = [];
      const frameTime = (1 / fps) * 1000;

      for (let i = 0; i < steps; i++) timeouts.push(window.setTimeout(() => onReachFrame(i + 1), frameTime * i));

      return () => timeouts.forEach((t) => clearTimeout(t));
    }
  }, [stop]);

  return (
    <div
      css={[
        css`
          position: absolute;
          display: inline-block;
          width: ${width * scale}px;
          height: ${height * scale}px;
          background-image: url(${src});
          background-size: ${naturalWidth * scale}px;
          background-position-y: -${height * row * scale}px;
          overflow: hidden;
        `,
        !stop && spriteSheetStyle(steps, fps, loop, width * scale * steps),
      ]}
      {...props}
    />
  );
};

export default memo(Sprite);
