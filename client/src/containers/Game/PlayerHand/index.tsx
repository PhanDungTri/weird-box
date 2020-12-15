import React, { useRef, useState } from "react";
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
        {cardList.map((c) => (
          <Card card={c} key={c.id} onChoose={() => playCard(c.id)} isChosen={chosenCard === c.id} />
        ))}
      </div>
    </>
  );
};

export default PlayerHand;
