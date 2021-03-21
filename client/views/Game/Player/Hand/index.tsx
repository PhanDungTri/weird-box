import { memo, useCallback, useEffect, useRef, useState } from "react";
import { animated, useTransition } from "react-spring";
import { SOCKET_EVENT } from "../../../../../shared/constants";
import { useAppState, useGameState, useHandState } from "../../../../hooks/useStore";
import socket from "../../../../services/socket";
import { AppState, HandState, selectCurrentPlayer } from "../../../../store";
import { fadeOut } from "../../../../styles/animations";
import Card from "../../Card";
import { handStyle } from "./styles";

type HandProps = {
  eliminated?: boolean;
};
const selectNotify = (state: AppState) => state.notify;
const selectCards = (state: HandState) => state.cards;
const selectRemoveCard = (state: HandState) => state.removeCard;

const Hand = ({ eliminated = false }: HandProps): JSX.Element => {
  const currentPlayer = useGameState(selectCurrentPlayer);
  const notify = useAppState(selectNotify);
  const cards = useHandState(selectCards);
  const removeCard = useHandState(selectRemoveCard);
  const ref = useRef<HTMLDivElement>(null);
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

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) setChosenCard("");
  };

  const playCard = useCallback(
    (id: string) => {
      // TODO check if in-turn
      if (chosenCard !== id) setChosenCard(id);
      else if (currentPlayer === socket.id)
        socket.emit(SOCKET_EVENT.PlayCard, id, (recentCard: string) => removeCard(recentCard));
      else notify("Danger")("Not your turn!");
    },
    [currentPlayer, chosenCard]
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => document.removeEventListener("click", handleClickOutside, true);
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

export default memo(Hand);
