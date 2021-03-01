import { Transition } from "react-transition-group";
import { TransitionStatus } from "react-transition-group/Transition";
import { SPELL_NAME } from "../../../../../shared/src/@enums";
import { CardInfo } from "../../../../../shared/src/@types";
import spriteLookup from "../../../utils/spriteLookup";
import Sprite from "../../../components/Sprite";
import "./Card.scss";

const setSprite = (spellName: SPELL_NAME, isCharge: boolean): string => {
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
};

const defaultStyle: React.CSSProperties = {
  transition: `transform 300ms`,
};

const transitionStyles: Record<TransitionStatus, React.CSSProperties> = {
  entering: {
    transform: "translateY(-30px)",
  },
  entered: {
    transform: "translateY(-30px)",
  },
  exiting: {
    transform: "translateY(0px)",
  },
  exited: {
    transform: "translateY(0px)",
  },
  unmounted: {},
};

const Card = ({ onClick, chosen = false, card, disabled = false }: CardProps): JSX.Element => {
  const choose = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    if (!disabled && onClick) {
      event.stopPropagation();
      onClick(card.id);
    }
  };

  return (
    <Transition in={chosen} timeout={200}>
      {(state) => (
        <div
          className={`card ${disabled ? "-disabled" : ""}`}
          onClick={choose}
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
        >
          <div className="card__content -centerize">
            <div className="card__spec -power">{Math.abs(card.power)}</div>
            <Sprite src={setSprite(card.spell, card.power >= 0)} size={[24, 24]} centerize />
            <div className="card__spec -action">{card.power >= 0 ? "+" : "-"}</div>
          </div>
        </div>
      )}
    </Transition>
  );
};

export default Card;