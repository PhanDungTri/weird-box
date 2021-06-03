import { memo } from "react";
import { CardInfo } from "../../../shared/@types";
import { SPELL_NAME } from "../../../shared/constants";
import { getNumberSign } from "../../../shared/utils";
import Icon from "../Icon";
import { centerizeStyle, disabledStyle } from "../../styles";
import { CardAction, cardChosenStyle, CardContent, CardPower, NormalCard, SmallCard } from "./styles";
import useMediaQuery from "../../hooks/useMediaQuery";

type CardProps = {
  card: CardInfo;
  onClick?: (id: string) => void;
  chosen?: boolean;
  disabled?: boolean;
  className?: string;
  small?: boolean;
};

const handleSpellName = (card: CardInfo) =>
  card.spell !== SPELL_NAME.Void ? card.spell : card.power >= 0 ? "charge" : "consume";

const Card = ({
  onClick,
  chosen = false,
  card,
  disabled = false,
  small = false,
  className,
}: CardProps): JSX.Element => {
  const matchMedia = useMediaQuery("(max-width: 325px)");

  const choose = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    if (!disabled && onClick) {
      event.stopPropagation();
      onClick(card.id);
    }
  };

  return small || matchMedia ? (
    <SmallCard className={className} css={[chosen && cardChosenStyle, disabled && disabledStyle]} onClick={choose}>
      <div>{getNumberSign(card.power) + Math.abs(card.power)}</div>
      <Icon name={handleSpellName(card)} css={{ position: "relative" }} />
    </SmallCard>
  ) : (
    <NormalCard className={className} css={[chosen && cardChosenStyle, disabled && disabledStyle]} onClick={choose}>
      <CardContent>
        <CardPower>{Math.abs(card.power)}</CardPower>
        <Icon name={handleSpellName(card)} css={centerizeStyle} />
        <CardAction>{getNumberSign(card.power)}</CardAction>
      </CardContent>
    </NormalCard>
  );
};

export default memo(Card);
