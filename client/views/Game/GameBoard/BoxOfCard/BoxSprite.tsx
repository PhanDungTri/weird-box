import { useAtom } from "jotai";
import { soundAtom } from "../../../../atoms";
import Sprite from "../../../../components/Sprite";
import { centerizeStyle } from "../../../../styles";
import { SpriteProps } from "../../../../types";
import { ANIMATION_STEP, COMMON_PROPS } from "./constants";

type BoxSpriteProps = Pick<SpriteProps, "onAnimationEnd" | "stop">;

const BoxSprite = (props: BoxSpriteProps): JSX.Element => {
  const [sound] = useAtom(soundAtom);

  const playDealSound = (frame: number) => {
    if (frame === 7) {
      sound?.play("Pop");
      sound?.play("TakeCard");
    }
  };

  return (
    <Sprite
      {...COMMON_PROPS}
      steps={ANIMATION_STEP}
      row={0}
      onReachFrame={playDealSound}
      css={centerizeStyle}
      {...props}
    />
  );
};

export default BoxSprite;
