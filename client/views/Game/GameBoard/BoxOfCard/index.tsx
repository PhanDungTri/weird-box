import IdleSprite from "../../../../assets/sprites/box_of_cards.png";
import DealCardSprite from "../../../../assets/sprites/box_of_cards_deal_card.png";
import OverChargedSprite from "../../../../assets/sprites/box_of_cards_overcharged.png";
import SpriteSheet from "../../../../components/SpriteSheet";
import { useBoxOfCardState } from "../../../../hooks/useStore";
import { BoxOfCardState, selectStatus } from "../../../../store";
import { centerizeStyle } from "../../../../styles";

const boxOfCardAnimationState = {
  idle: {
    src: IdleSprite,
    steps: 1,
  },
  deal: {
    src: DealCardSprite,
    steps: 11,
  },
};

const commonProps = {
  size: [59, 59] as [number, number],
  scale: 3,
  css: centerizeStyle,
};

const selectIdle = (state: BoxOfCardState) => state.idle;
const selectStabilize = (state: BoxOfCardState) => state.stabilize;
const selectOvercharged = (state: BoxOfCardState) => state.overcharged;

const BoxOfCard = (): JSX.Element => {
  const status = useBoxOfCardState(selectStatus);
  const idle = useBoxOfCardState(selectIdle);
  const stabilize = useBoxOfCardState(selectStabilize);
  const overcharged = useBoxOfCardState(selectOvercharged);

  return (
    <>
      <SpriteSheet key={status} onAnimationEnd={idle} {...boxOfCardAnimationState[status]} {...commonProps} />
      {overcharged && <SpriteSheet src={OverChargedSprite} steps={9} {...commonProps} onAnimationEnd={stabilize} />}
    </>
  );
};

export default BoxOfCard;
