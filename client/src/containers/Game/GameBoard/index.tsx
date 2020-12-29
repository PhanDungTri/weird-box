import React, { useState } from "react";
import { animated, useTransition } from "react-spring";
import ANIMATION_DURATION from "../../../../../shared/src/animationDuration";
import SOCKET_EVENT from "../../../../../shared/src/socketEvent";
import Card from "../../../components/Card";
import useSocketEvent from "../../../hooks/useSocketEvent";
import ICard from "../../../interfaces/ICard";
import BoxOfCard from "./BoxOfCard";
import ChargePointBar from "./ChargePointBar";
import "./GameBoard.scss";

const GameBoard = (): JSX.Element => {
  const [playedCard, setPlayedCard] = useState<ICard>();
  const [consumeAnimation, setConsumeAnimation] = useState(false);
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

  const showPlayedCard = (card: ICard): void => {
    setPlayedCard(card);
    setConsumeAnimation(true);
    setTimeout(() => setConsumeAnimation(false), ANIMATION_DURATION.ConsumeCard);
  };

  useSocketEvent(SOCKET_EVENT.CardPlayed, showPlayedCard);

  return (
    <div className="game-board">
      <BoxOfCard />
      <ChargePointBar />
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

export default GameBoard;
