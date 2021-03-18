import IdleSprite from "../../../../assets/sprites/box_of_cards.png";
import DealCardSprite from "../../../../assets/sprites/box_of_cards_deal_card.png";
import OverChargedSprite from "../../../../assets/sprites/box_of_cards_overcharged.png";
import SpriteSheet from "../../../../components/SpriteSheet";
import { useBoxOfCardState } from "../../../../hooks/useStore";
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

const BoxOfCard = (): JSX.Element => {
  const status = useBoxOfCardState((state) => state.status);
  const idle = useBoxOfCardState((state) => state.idle);
  const stabilize = useBoxOfCardState((state) => state.stabilize);
  const overcharged = useBoxOfCardState((state) => state.overcharged);

  return (
    <>
      <SpriteSheet key={status} onAnimationEnd={idle} {...boxOfCardAnimationState[status]} {...commonProps} />
      {overcharged && <SpriteSheet src={OverChargedSprite} steps={9} {...commonProps} onAnimationEnd={stabilize} />}
    </>
  );
};

export default BoxOfCard;
