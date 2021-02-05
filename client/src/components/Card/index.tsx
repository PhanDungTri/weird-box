import React from "react";
import SPELL_NAME from "../../../../shared/src/SpellName";
import ChargeSprite from "../../assets/sprites/charge.png";
import ConsumeSprite from "../../assets/sprites/consume.png";
import ICard from "../../interfaces/ICard";
import spellSpriteHolder from "../../utils/spellSpriteHolder";
import Sprite from "../Sprite";
import "./Card.scss";

const setSprite = (spellName: SPELL_NAME, isCharge: boolean): string => {
  if (spellSpriteHolder[spellName]) {
    return spellSpriteHolder[spellName];
  }

  return isCharge ? ChargeSprite : ConsumeSprite;
};

interface CardProps {
  card: ICard;
  onChoose?: () => void;
  isChosen?: boolean;
}

const dummyFn = (): void => {
  return;
};

const Card = ({ onChoose = dummyFn, isChosen = false, card }: CardProps): JSX.Element => {
  const chooseMe = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    event.stopPropagation();
    onChoose();
  };

  return (
    <div className={`card ${isChosen ? "-chosen" : ""}`} onClick={chooseMe}>
      <div className="card__content -centerize">
        <div className="card__spec -power-point">{Math.abs(card.powerPoint)}</div>
        <Sprite src={setSprite(card.spell, card.powerPoint >= 0)} size={[24, 24]} centerize />
        <div className="card__spec -action">{card.powerPoint >= 0 ? "+" : "-"}</div>
      </div>
    </div>
  );
};

export default Card;
