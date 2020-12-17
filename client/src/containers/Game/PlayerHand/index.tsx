import React, { useRef, useState } from "react";
import { animated, useTransition } from "react-spring";
import { useRecoilValue } from "recoil";
import SOCKET_EVENT from "../../../../../shared/socketEvent";
import Card from "../../../components/Card";
import useSocketEvent from "../../../hooks/useSocketEvent";
import ICard from "../../../interfaces/ICard";
import { socketState } from "../../../state";
import { useGameContext } from "../Game.context";
import "./PlayerHand.scss";

const PlayerHand = (): JSX.Element => {
  const socket = useRecoilValue(socketState);
  const self = useRef<HTMLDivElement>(null);
  const [hand, setHand] = useState<ICard[]>([]);
  const { chosenCard, chooseCard } = useGameContext();
  const transitions = useTransition(hand, (card) => card.id, {
    from: {
      position: "relative",
      transform: "translateY(40px)",
      opacity: 0.5,
    },
    enter: {
      transform: "translateY(0px)",
      scale: 1,
      opacity: 1,
    },
    leave: {
      opacity: 0,
    },
  });

  const addCards = (cards: ICard[]) => setHand((list) => [...list, ...cards]);

  useSocketEvent(SOCKET_EVENT.TakeCard, addCards);

  const playCard = (id: string): void => {
    // TODO check if in-turn
    if (chosenCard !== id) chooseCard(id);
    else {
      socket.emit(SOCKET_EVENT.PlayCard, id);
      socket.once(SOCKET_EVENT.CardPlayed, () => {
        setHand(hand.filter((c) => c.id !== id));
      });
    }
  };

  return (
    <>
      <div className="player-hand" ref={self}>
        {transitions.map(({ item, key, props }) => (
          <animated.div key={key} style={props}>
            <Card card={item} key={item.id} onChoose={() => playCard(item.id)} isChosen={chosenCard === item.id} />
          </animated.div>
        ))}
      </div>
    </>
  );
};

export default PlayerHand;
