import React, { useState } from "react";
import Card from "../../../components/Card";
import Sprite from "../../../components/Sprite";
import useSocketEvent from "../../../hooks/useSocketEvent";
import ICard from "../../../interfaces/ICard";
import ChargePointBar from "./ChargePointBar";
import BoxOfCardDealCardSprite from "../../../assets/sprites/box_of_cards_deal_card.png";
import BoxOfCardSprite from "../../../assets/sprites/box_of_cards.png";
import "./BoxOfCard.scss";
import { animated, useTransition } from "react-spring";
import ANIMATION_DURATION from "../../../../../shared/animationDuration";

interface IGameUpdateRes {
  playedCard: ICard;
  chargePoint: number;
}

const BoxOfCard = (): JSX.Element => {
  const [chargePoint, setChargePoint] = useState(0);
  const [playedCard, setPlayerCard] = useState<ICard>();
  const [consumeAnimation, setConsumeAnimation] = useState(false);
  const [dealCardAnimation, setDealCardAnimation] = useState(false);
  const transitions = useTransition(consumeAnimation, null, {
    from: {
      bottom: "0%",
      opacity: 1,
    },
    enter: {
      bottom: "16%",
    },
    leave: {
      opacity: 0,
    },
  });

  const updateGame = ({ chargePoint, playedCard }: IGameUpdateRes): void => {
    setChargePoint(chargePoint);
    setPlayerCard(playedCard);
    setConsumeAnimation(true);
    setTimeout(() => setConsumeAnimation(false), ANIMATION_DURATION.ConsumeCard);
  };

  const dealCard = (): void => {
    setDealCardAnimation(true);
    setTimeout(() => setDealCardAnimation(false), ANIMATION_DURATION.DealCard);
  };

  useSocketEvent("update game", updateGame);
  useSocketEvent("take card", dealCard);

  return (
    <div className="box-of-card">
      <div className="box-of-card-sprite">
        {!dealCardAnimation ? (
          <Sprite key="deal" size={[59, 59]} scale={3} src={BoxOfCardDealCardSprite} step={10} tick={3} />
        ) : (
          <Sprite key="idle" size={[59, 59]} scale={3} src={BoxOfCardSprite} />
        )}
        <ChargePointBar value={chargePoint} />
      </div>
      {!!playedCard &&
        transitions.map(
          ({ item, key, props }) =>
            item && (
              <animated.div className="animated-played-card" key={key} style={props}>
                <Card card={playedCard} />
              </animated.div>
            )
        )}
    </div>
  );
};

export default BoxOfCard;
