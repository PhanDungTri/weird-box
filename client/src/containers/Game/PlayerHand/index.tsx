import React, { useRef, useState } from "react";
import { useTransition, animated } from "react-spring";
import { useRecoilValue } from "recoil";
import Card from "../../../components/Card";
import useSocketEvent from "../../../hooks/useSocketEvent";
import ICard from "../../../interfaces/ICard";
import { socketState } from "../../../state";
import { useGameContext } from "../Game.context";
import "./PlayerHand.scss";

const PlayerHand = (): JSX.Element => {
  const socket = useRecoilValue(socketState);
  const self = useRef<HTMLDivElement>(null);
  const [cardList, setCardList] = useState<ICard[]>([]);
  const { chosenCard, chooseCard } = useGameContext();
  const transitions = useTransition(cardList, (card) => card.id, {
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

  const addCard = (card: ICard) => setCardList((cards) => [...cards, card]);

  useSocketEvent("take card", addCard);

  const playCard = (id: string): void => {
    if (chosenCard !== id) chooseCard(id);
    else {
      socket.emit("play card", id);
      socket.once("play card ok", () => {
        setCardList(cardList.filter((c) => c.id !== id));
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
