import Sprite from "./Sprite";
import SpeechlessSprite from "../assets/sprites/speechless.png";
import { centerizeStyle, slotStyle } from "../styles";

type EmptySlotProps = {
  scale?: number;
  className?: string;
};

const EmptySlot = ({ scale = 1, ...props }: EmptySlotProps): JSX.Element => {
  return (
    <div css={slotStyle(scale)} {...props}>
      <Sprite src={SpeechlessSprite} size={[24, 24]} scale={scale} css={centerizeStyle} />
    </div>
  );
};

export default EmptySlot;
