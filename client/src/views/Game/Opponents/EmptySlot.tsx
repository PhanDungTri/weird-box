import Sprite from "../../../components/Sprite";
import SpeechlessSprite from "../../../assets/sprites/speechless.png";
import { centerizeStyle } from "../../../styles";
import { slotStyle } from "./styles";

const EmptySlot = (): JSX.Element => {
  return (
    <div css={slotStyle}>
      <Sprite src={SpeechlessSprite} size={[24, 24]} scale={2} css={centerizeStyle} />
    </div>
  );
};

export default EmptySlot;
