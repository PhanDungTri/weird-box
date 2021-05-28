import { css } from "@emotion/react";
import LoadingSpriteSheet from "../../assets/sprites/loading_animation.png";
import Sprite from "../Sprite";
import { loadingStyle } from "./styles";

type LoadingProps = {
  text?: string;
  scale?: number;
  className?: string;
};

const Loading = ({ text, scale, ...props }: LoadingProps): JSX.Element => {
  return (
    <div css={loadingStyle}>
      <Sprite
        scale={scale}
        size={[16, 22]}
        src={LoadingSpriteSheet}
        fps={5}
        steps={10}
        loop
        css={css`
          position: relative;
        `}
        {...props}
      />
      {text && (
        <span
          style={{
            lineHeight: 0.7,
            fontSize: `${scale}rem`,
          }}
        >
          {text}
        </span>
      )}
    </div>
  );
};

export default Loading;
