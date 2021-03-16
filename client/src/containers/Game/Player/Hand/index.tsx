import { useEffect, useRef, useState } from "react";
import { animated, useTransition } from "react-spring";
import { SOCKET_EVENT } from "../../../../../../shared/src/@enums";
import { CardInfo } from "../../../../../../shared/src/@types";
import useNotification from "../../../../hooks/useNotification";
import socket from "../../../../services/socket";
import { fadeOut } from "../../../../styles/animations";
import Card from "../../Card";
import { useGameContext } from "../../context";
import { handStyle } from "./styles";

type HandProps = {
  eliminated?: boolean;
};

const Hand = ({ eliminated = false }: HandProps): JSX.Element => {
  const { currentPlayer } = useGameContext();
  const ref = useRef<HTMLDivElement>(null);
  const { notify } = useNotification();
  const [cards, setCards] = useState<CardInfo[]>([]);
  const [chosenCard, setChosenCard] = useState("");
  const transitions = useTransition(cards, (c) => c.id, {
    from: {
      opacity: 0,
      transform: "translateY(40px)",
      maxWidth: "0px",
    },
    enter: [{ maxWidth: "100px" }, { opacity: 1, transform: "translateY(0px)" }],
    leave: fadeOut,
  });

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
    <div ref={ref} css={handStyle}>
      {transitions.map(({ item, props, key }) => (
        <animated.div key={key} style={props}>
          <Card disabled={eliminated} card={item} onClick={playCard} chosen={chosenCard === item.id} />
        </animated.div>
      ))}
    </div>
  );
};

export default Hand;
