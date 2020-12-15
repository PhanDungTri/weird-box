import React from "react";
import ICard from "../../interfaces/ICard";
import "./Card.scss";

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
        <div className="card-spec power-point">{card.powerPoint}</div>
        <div className="card-spec action">{card.action ? "+" : "-"}</div>
      </div>
    </div>
  );
};

export default Card;
