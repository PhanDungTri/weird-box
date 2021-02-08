import React, { useEffect, useState } from "react";
import { animated, useTransition } from "react-spring";
import ANIMATION_DURATION from "../../../../../../shared/src/AnimationDuration";
import SOCKET_EVENT from "../../../../../../shared/src/SocketEvent";
import Card from "../../../../components/Card";
import socket from "../../../../services/socket";
import ICard from "../../../../interfaces/ICard";
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

  useEffect(() => {
    socket.on(SOCKET_EVENT.CardPlayed, showPlayedCard);

    return (): void => {
      console.log("off");
      socket.off(SOCKET_EVENT.CardPlayed);
    };
  }, []);

  return (
    <div className="game-board">
      <BoxOfCard />
      <ChargePointBar />
      {!!playedCard &&
        transitions.map(
          ({ item, key, props }) =>
            item && (
              <animated.div className="game-board__played-card" key={key} style={props}>
                <Card card={playedCard} />
              </animated.div>
            )
        )}
    </div>
  );
};

export default GameBoard;
