import { memo } from "react";
import { SPELL_NAME } from "../../../../shared/constants";
import { CardInfo } from "../../../../shared/@types";
import Sprite from "../../../components/Sprite";
import { centerizeStyle, disabledStyle } from "../../../styles";
import spriteLookup from "../../../utils/spriteLookup";
import { CardAction, cardChosenStyle, CardContent, CardPower, cardStyle } from "./styles";

const setSprite = (spellName: SPELL_NAME, isCharge: boolean) => {
  if (spriteLookup[spellName]) {
    return spriteLookup[spellName];
  }

  return isCharge ? spriteLookup.Charge : spriteLookup.Consume;
};

type CardProps = {
  card: CardInfo;
  onClick?: (id: string) => void;
  chosen?: boolean;
  disabled?: boolean;
  className?: string;
};

const Card = ({ onClick, chosen = false, card, disabled = false, className }: CardProps): JSX.Element => {
  const choose = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    if (!disabled && onClick) {
      event.stopPropagation();
      onClick(card.id);
    }
  };

  return (
    <div className={className} css={[cardStyle, chosen && cardChosenStyle, disabled && disabledStyle]} onClick={choose}>
      <CardContent>
        <CardPower>{Math.abs(card.power)}</CardPower>
        <Sprite src={setSprite(card.spell, card.power >= 0)} size={[24, 24]} css={centerizeStyle} />
        <CardAction>{card.power >= 0 ? "+" : "-"}</CardAction>
      </CardContent>
    </div>
  );
};

export default memo(Card);
