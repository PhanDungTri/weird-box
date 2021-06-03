import LoadingSpriteSheet from "url:../../assets/sprites/loading_animation.png";
import Sprite from "../Sprite";
import { StyledLoading } from "./styles";

type LoadingProps = {
  text?: string;
  scale?: number;
  className?: string;
};

const Loading = ({ text, scale, className }: LoadingProps): JSX.Element => {
  return (
    <StyledLoading>
      <Sprite
        scale={scale}
        size={[16, 22]}
        src={LoadingSpriteSheet}
        fps={5}
        steps={10}
        loop
        css={{ position: "relative" }}
        className={className}
      />
      {text && (
        <span
          css={{
            lineHeight: 0.7,
            fontSize: `${scale}rem`,
          }}
        >
          {text}
        </span>
      )}
    </StyledLoading>
  );
};

export default Loading;
