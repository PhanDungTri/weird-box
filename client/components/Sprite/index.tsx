import { css } from "@emotion/react";
import { memo } from "react";
import { spriteStyle } from "./styles";

type SpriteProps = {
  size: [number, number];
  src: string;
  scale?: number;
  className?: string;
  onAnimationEnd?: () => void;
  onClick?: () => void;
};

const Sprite = ({ size: [width, height], src, scale = 1, ...props }: SpriteProps): JSX.Element => {
  return (
    <div
      css={[
        spriteStyle,
        css`
          width: ${width * scale}px;
          height: ${height * scale}px;
          background-image: url(${src});
        `,
      ]}
      {...props}
    />
  );
};

export default memo(Sprite);
export type { SpriteProps };
