import { useEffect, useState } from "react";
import Transition, { TransitionStatus } from "react-transition-group/Transition";
import { SOCKET_EVENT } from "../../../../../shared/src/@enums";
import { CardInfo } from "../../../../../shared/src/@types";
import Card from "../Card";
import socket from "../../../services/socket";
import { useGameContext } from "../context";
import BoxOfCard from "./BoxOfCard";
import ChargePointBar from "./ChargePointBar";
import "./GameBoard.scss";

const defaultStyle: React.CSSProperties = {
  transition: "opacity 300ms, bottom 300ms",
};

const transitionStyles: Record<TransitionStatus, React.CSSProperties> = {
  entering: {
    opacity: 1,
    bottom: "5%",
  },
  entered: {
    opacity: 1,
    bottom: "5%",
  },
  exiting: {
    opacity: 0,
    bottom: "10%",
  },
  exited: {
    opacity: 0,
    bottom: "0%",
  },
  unmounted: {},
};

const GameBoard = (): JSX.Element => {
  const [playedCard, setPlayedCard] = useState<CardInfo>();
  const [shouldCosumeAnimationPlay, setShouldCosumeAnimationPlay] = useState(false);
  const { finishTurn } = useGameContext();

  const showPlayedCard = (card: CardInfo): void => {
    finishTurn();
    setPlayedCard(card);
    setShouldCosumeAnimationPlay(true);
    setTimeout(() => setShouldCosumeAnimationPlay(false), 600);
  };

  useEffect(() => {
    socket.on(SOCKET_EVENT.CardPlayed, showPlayedCard);
    return () => void socket.off(SOCKET_EVENT.CardPlayed);
  }, []);

  return (
    <div className="game-board">
      <BoxOfCard />
      <ChargePointBar />
      <Transition in={shouldCosumeAnimationPlay} timeout={300}>
        {(state) => (
          <div
            className="game-board__played-card"
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            {!!playedCard && <Card card={playedCard} />}
          </div>
        )}
      </Transition>
    </div>
  );
};

export default GameBoard;
