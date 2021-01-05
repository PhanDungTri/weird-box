import React, { useRef, useState } from "react";
import { animated, useTransition } from "react-spring";
import { useRecoilValue, useSetRecoilState } from "recoil";
import SOCKET_EVENT from "../../../../../shared/src/socketEvent";
import Card from "../../../components/Card";
import NOTI_VARIANT from "../../../constants/NOTI_VARIANT";
import useSocketEvent from "../../../hooks/useSocketEvent";
import ICard from "../../../interfaces/ICard";
import { socketState } from "../../../state";
import notificationState from "../../../state/notificationState";
import { useGameContext } from "../Game.context";
import "./PlayerHand.scss";

const PlayerHand = (): JSX.Element => {
  const socket = useRecoilValue(socketState);
  const setNotification = useSetRecoilState(notificationState);
  const self = useRef<HTMLDivElement>(null);
  const [hand, setHand] = useState<ICard[]>([]);
  const { chosenCard, setChosenCard, currentPlayer } = useGameContext();

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

  const playCard = (id: string): void => {
    // TODO check if in-turn
    if (chosenCard !== id) setChosenCard(id);
    else if (currentPlayer === socket.id) {
      socket.emit(SOCKET_EVENT.PlayCard, id);
      socket.once(SOCKET_EVENT.CardPlayed, () => {
        setHand(hand.filter((c) => c.id !== id));
      });
    } else {
      setNotification({
        message: "Not your turn!",
        variant: NOTI_VARIANT.Error,
        show: true,
      });
    }
  };

  useSocketEvent(SOCKET_EVENT.TakeCard, (cards: ICard[]) => setHand((list) => [...list, ...cards]));

  return (
    <>
      <div className="player-hand" ref={self}>
        {transitions.map(({ item, key, props }) => (
          <animated.div key={key} style={props}>
            <Card card={item} onChoose={() => playCard(item.id)} isChosen={chosenCard === item.id} />
          </animated.div>
        ))}
      </div>
    </>
  );
};

export default PlayerHand;
