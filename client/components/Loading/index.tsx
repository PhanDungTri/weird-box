import { css } from "@emotion/react";
import LoadingSpriteSheet from "../../assets/sprites/loading_animation.png";
import SpriteSheet from "../SpriteSheet";
import { loadingStyle } from "./styles";

type LoadingProps = {
  text?: string;
};

const Loading = ({ text }: LoadingProps): JSX.Element => {
  return (
    <div css={loadingStyle}>
      <SpriteSheet
        size={[16, 22]}
        src={LoadingSpriteSheet}
        fps={5}
        steps={10}
        loop
        css={css`
          position: relative;
        `}
      />
      {text && (
        <span
          css={css`
            line-height: 0.7;
          `}
        >
          {text}
        </span>
      )}
    </div>
  );
};

export default Loading;
