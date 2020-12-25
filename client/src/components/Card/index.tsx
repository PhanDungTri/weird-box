import React from "react";
import ICard from "../../interfaces/ICard";
import "./Card.scss";
import "../../styles/common/centerize.scss";
import PunchEffectSprite from "../../assets/sprites/punch.png";
import ChargeSprite from "../../assets/sprites/charge.png";
import ConsumeSprite from "../../assets/sprites/consume.png";
import PoisonEffectSprite from "../../assets/sprites/poison.png";
import EFFECT_NAME from "../../../../shared/src/effectName";
import Sprite from "../Sprite";

const setSprite = (effectName: EFFECT_NAME, isCharge: boolean): string => {
  switch (effectName) {
    case EFFECT_NAME.Punch:
      return PunchEffectSprite;
    case EFFECT_NAME.Poison:
      return PoisonEffectSprite;
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
    <div className={`card ${isChosen ? "chosen" : ""}`} onClick={chooseMe}>
      <div className="card-content">
        <div className="card-spec power-point">{Math.abs(card.powerPoint)}</div>
        <div className="card-spec centerize">
          <Sprite src={setSprite(card.effect, card.powerPoint >= 0)} size={[24, 24]} />
        </div>
        <div className="card-spec action">{card.powerPoint >= 0 ? "+" : "-"}</div>
      </div>
    </div>
  );
};

export default Card;
