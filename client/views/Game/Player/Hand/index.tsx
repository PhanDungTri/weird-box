import { Howl } from "howler";
import { useAtom } from "jotai";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { animated, useTransition } from "react-spring";
import { CardInfo } from "../../../../../shared/@types";
import { CLIENT_EVENT_NAME, SERVER_EVENT_NAME } from "../../../../../shared/constants";
import ChooseSound from "../../../../assets/sounds/choose_card.mp3";
import { notificationsAtom } from "../../../../atoms";
import { useInTurn, useListenServerEvent, useOnEliminate } from "../../../../hooks";
import socket from "../../../../services/socket";
import { fadeOut } from "../../../../styles/animations";
import Card from "../../Card";
import { handStyle } from "./styles";

const Hand = (): JSX.Element => {
  const isInTurn = useInTurn(socket.id);
  const isEliminated = useOnEliminate(socket.id);
  const [cards, setCards] = useState<CardInfo[]>([]);
  const [chooseSound] = useState(new Howl({ src: [ChooseSound] }));
  const [chosenCard, setChosenCard] = useState("");
  const [, notify] = useAtom(notificationsAtom);
  const ref = useRef<HTMLDivElement>(null);

  const transitions = useTransition(cards, (c) => c.id, {
    from: {
      opacity: 0,
      transform: "translateY(40px)",
      maxWidth: "0px",
    },
    enter: [{ maxWidth: "100px" }, { opacity: 1, transform: "translateY(0px)" }],
    leave: fadeOut,
  });

  const playCard = useCallback(
    (id: string) => {
      if (chosenCard !== id) {
        setChosenCard(id);
        chooseSound.play();
      } else if (isInTurn)
        socket.emit(CLIENT_EVENT_NAME.PlayCard, chosenCard, (err, message = "") => {
          if (err) notify({ message, variant: "Danger" });
          else setCards((list) => list.filter((c) => c.id !== chosenCard));
        });
      else notify({ message: "Not your turn!", variant: "Danger" });
    },
    [isInTurn, chosenCard]
  );

  useListenServerEvent(SERVER_EVENT_NAME.GetCards, (cards: CardInfo[]) => setCards((list) => [...list, ...cards]));

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setChosenCard("");
    };

    document.addEventListener("click", handleClickOutside, true);

    return () => document.removeEventListener("click", handleClickOutside, true);
  }, []);

  return (
    <div ref={ref} css={handStyle}>
      {transitions.map(({ item, props, key }) => (
        <animated.div key={key} style={props}>
          <Card disabled={isEliminated} card={item} onClick={playCard} chosen={chosenCard === item.id} />
        </animated.div>
      ))}
    </div>
  );
};

export default memo(Hand);
