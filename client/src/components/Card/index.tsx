import React from "react";
import { Transition } from "react-transition-group";
import { TransitionStatus } from "react-transition-group/Transition";
import { SPELL_NAME } from "../../../../shared/src/interfaces/Spell";
import ICard from "../../interfaces/ICard";
import spriteLibrary from "../../utils/spriteLibrary";
import Sprite from "../Sprite";
import "./Card.scss";

const setSprite = (spellName: SPELL_NAME, isCharge: boolean): string => {
  if (spriteLibrary[spellName]) {
    return spriteLibrary[spellName];
  }

  return isCharge ? spriteLibrary.Charge : spriteLibrary.Consume;
};

interface CardProps {
  card: ICard;
  onClick?: (id: string) => void;
  chosen?: boolean;
  disabled?: boolean;
}

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
            <div className="card__spec -power-point">{Math.abs(card.powerPoint)}</div>
            <Sprite src={setSprite(card.spell, card.powerPoint >= 0)} size={[24, 24]} centerize />
            <div className="card__spec -action">{card.powerPoint >= 0 ? "+" : "-"}</div>
          </div>
        </div>
      )}
    </Transition>
  );
};

export default Card;
