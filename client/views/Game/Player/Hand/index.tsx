import { useAtom } from "jotai";
import { memo, useCallback, useState } from "react";
import { animated, useTransition } from "react-spring";
import { CardInfo } from "../../../../../shared/@types";
import { CLIENT_EVENT_NAME, SERVER_EVENT_NAME } from "../../../../../shared/constants";
import { languageAtom } from "../../../../atoms";
import Card from "../../../../components/Card";
import { useInTurn, useListenServerEvent, useOnClickOutside, useOnEliminate } from "../../../../hooks";
import { useNotify } from "../../../../hooks/useNotify";
import socket from "../../../../services/socket";
import { fadeOut } from "../../../../styles";
import { StyledHand } from "./styles";

const Hand = (): JSX.Element => {
  const [language] = useAtom(languageAtom);
  const isInTurn = useInTurn(socket.id);
  const isEliminated = useOnEliminate(socket.id);
  const notify = useNotify();
  const [cards, setCards] = useState<CardInfo[]>([]);
  const [chosenCard, setChosenCard] = useState("");
  const ref = useOnClickOutside<HTMLDivElement>(() => setChosenCard(""));

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
      if (chosenCard !== id) setChosenCard(id);
      else if (isInTurn) {
        socket.emit(CLIENT_EVENT_NAME.PlayCard, chosenCard);
        setCards((list) => list.filter((c) => c.id !== chosenCard));
      } else notify(language.errNotInTurn, "Danger");
    },
    [isInTurn, chosenCard]
  );

  useListenServerEvent(SERVER_EVENT_NAME.GetCards, (cards: CardInfo[]) => setCards((list) => [...list, ...cards]));

  return (
    <StyledHand ref={ref}>
      {transitions.map(({ item, props, key }) => (
        <animated.div key={key} style={props}>
          <Card disabled={isEliminated} card={item} onClick={playCard} chosen={chosenCard === item.id} />
        </animated.div>
      ))}
    </StyledHand>
  );
};

export default memo(Hand);
