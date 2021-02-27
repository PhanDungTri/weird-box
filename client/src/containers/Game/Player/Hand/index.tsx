import React, { useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { SOCKET_EVENT } from "../../../../../../shared/src/@enums";
import { CardInfo } from "../../../../../../shared/src/@types";
import Card from "../../Card";
import NOTI_VARIANT from "../../../../constants/NOTI_VARIANT";
import socket from "../../../../services/socket";
import useNotificationState from "../../../../state/notificationState";
import { useGameContext } from "../../context";
import "./Hand.scss";

interface HandProps {
  eliminated?: boolean;
}

const Hand = ({ eliminated = false }: HandProps): JSX.Element => {
  const { chooseCard, chosenCard, currentPlayer } = useGameContext();
  const setNotification = useNotificationState().set;
  const [cards, setCards] = useState<CardInfo[]>([]);

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
    socket.on(SOCKET_EVENT.TakeCard, (cards: CardInfo[]) => setCards((list) => [...list, ...cards]));

    return (): void => {
      socket.off(SOCKET_EVENT.TakeCard);
    };
  }, []);

  return (
    <TransitionGroup className="player__hand">
      {cards.map((c) => (
        <CSSTransition timeout={600} classNames="card-transition" key={c.id}>
          <Card disabled={eliminated} card={c} onClick={playCard} chosen={chosenCard === c.id} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

export default Hand;
