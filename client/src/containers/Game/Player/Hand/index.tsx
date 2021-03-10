import { useEffect, useRef, useState } from "react";
import { Transition, TransitionGroup } from "react-transition-group";
import { SOCKET_EVENT } from "../../../../../../shared/src/@enums";
import { CardInfo } from "../../../../../../shared/src/@types";
import socket from "../../../../services/socket";
import useNotificationState from "../../../../state/notificationState";
import Card from "../../Card";
import { useGameContext } from "../../context";
import { cardTransition, handStyle } from "./styles";

type HandProps = {
  eliminated?: boolean;
};

const Hand = ({ eliminated = false }: HandProps): JSX.Element => {
  const { currentPlayer } = useGameContext();
  const ref = useRef<HTMLDivElement>(null);
  const { notify } = useNotificationState();
  const [cards, setCards] = useState<CardInfo[]>([]);
  const [chosenCard, setChosenCard] = useState("");

  const handleClickOutside = (event: MouseEvent): void => {
    if (ref.current && !ref.current.contains(event.target as Node)) setChosenCard("");
  };

  const playCard = (id: string): void => {
    // TODO check if in-turn
    if (chosenCard !== id) setChosenCard(id);
    else if (currentPlayer === socket.id) {
      socket.emit(SOCKET_EVENT.PlayCard, id);
      socket.once(SOCKET_EVENT.CardPlayed, () => setCards(cards.filter((c) => c.id !== id)));
    } else notify("Danger")("Not your turn!");
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    socket.on(SOCKET_EVENT.TakeCard, (cards: CardInfo[]) => setCards((list) => [...list, ...cards]));

    return (): void => {
      socket.off(SOCKET_EVENT.TakeCard);
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div ref={ref}>
      <TransitionGroup css={handStyle}>
        {cards.map((c) => (
          <Transition timeout={600} key={c.id}>
            {(state) => (
              <div css={cardTransition(state)}>
                <Card disabled={eliminated} card={c} onClick={playCard} chosen={chosenCard === c.id} />
              </div>
            )}
          </Transition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default Hand;
