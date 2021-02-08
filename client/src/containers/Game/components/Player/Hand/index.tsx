import React, { useEffect, useState } from "react";
import { animated, useTransition } from "react-spring";
import SOCKET_EVENT from "../../../../../../../shared/src/SocketEvent";
import Card from "../../../../../components/Card";
import NOTI_VARIANT from "../../../../../constants/NOTI_VARIANT";
import ICard from "../../../../../interfaces/ICard";
import socket from "../../../../../services/socket";
import useNotificationState from "../../../../../state/notificationState";
import { useCurrentPlayerContext, useCardChoiceContext } from "../../../business/context";
import "./Hand.scss";

interface HandProps {
  eliminated?: boolean;
}

const Hand = ({ eliminated = false }: HandProps): JSX.Element => {
  const { chooseCard, chosenCard } = useCardChoiceContext();
  const { currentPlayer } = useCurrentPlayerContext();
  const setNotification = useNotificationState().set;
  const [cards, setCards] = useState<ICard[]>([]);

  const transitions = useTransition(cards, (card) => card.id, {
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
    if (chosenCard !== id) chooseCard(id);
    else if (currentPlayer === socket.id) {
      socket.emit(SOCKET_EVENT.PlayCard, id);
      socket.once(SOCKET_EVENT.CardPlayed, () => setCards(cards.filter((c) => c.id !== id)));
    } else {
      setNotification({
        message: "Not your turn!",
        variant: NOTI_VARIANT.Error,
        show: true,
      });
    }
  };

  useEffect(() => {
    socket.on(SOCKET_EVENT.TakeCard, (cards: ICard[]) => setCards((list) => [...list, ...cards]));

    return (): void => {
      console.log("off");
      socket.off(SOCKET_EVENT.TakeCard);
    };
  }, []);

  return (
    <>
      <div className="player__hand">
        {transitions.map(({ item, key, props }) => (
          <animated.div key={key} style={props}>
            <Card
              disabled={eliminated}
              card={item}
              onChoose={() => playCard(item.id)}
              chosen={chosenCard === item.id}
            />
          </animated.div>
        ))}
      </div>
    </>
  );
};

export default Hand;
