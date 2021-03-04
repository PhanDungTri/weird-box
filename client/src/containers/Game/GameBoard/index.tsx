import { useEffect, useState } from "react";
import { SOCKET_EVENT } from "../../../../../shared/src/@enums";
import { CardInfo } from "../../../../../shared/src/@types";
import socket from "../../../services/socket";
import Card from "../Card";
import { useGameContext } from "../context";
import BoxOfCard from "./BoxOfCard";
import ChargePointBar from "./ChargePointBar";
import { cardPlayedAnimation, gameBoard } from "./styles";

const GameBoard = (): JSX.Element => {
  const [playedCard, setPlayedCard] = useState<CardInfo>();
  const { finishTurn } = useGameContext();

  const showPlayedCard = (card: CardInfo): void => {
    finishTurn();
    setPlayedCard(card);
  };

  useEffect(() => {
    socket.on(SOCKET_EVENT.CardPlayed, showPlayedCard);
    return () => void socket.off(SOCKET_EVENT.CardPlayed);
  }, []);

  return (
    <div css={gameBoard}>
      <BoxOfCard />
      <ChargePointBar />
      {!!playedCard && (
        <div onAnimationEnd={() => setPlayedCard(undefined)} css={cardPlayedAnimation}>
          <Card card={playedCard} />
        </div>
      )}
    </div>
  );
};

export default GameBoard;
