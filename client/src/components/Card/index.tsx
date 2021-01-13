import React from "react";
import SPELL_NAME from "../../../../shared/src/SpellName";
import ChargeSprite from "../../assets/sprites/charge.png";
import ConsumeSprite from "../../assets/sprites/consume.png";
import HealSpellSprite from "../../assets/sprites/heal.png";
import PoisonSpellSprite from "../../assets/sprites/poison.png";
import PunchSpellSprite from "../../assets/sprites/punch.png";
import ICard from "../../interfaces/ICard";
import Sprite from "../Sprite";
import "./Card.scss";

const setSprite = (spellName: SPELL_NAME, isCharge: boolean): string => {
  switch (spellName) {
    case SPELL_NAME.Punch:
      return PunchSpellSprite;
    case SPELL_NAME.Poison:
      return PoisonSpellSprite;
    case SPELL_NAME.Heal:
      return HealSpellSprite;
    default: {
      return isCharge ? ChargeSprite : ConsumeSprite;
    }
  }
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
