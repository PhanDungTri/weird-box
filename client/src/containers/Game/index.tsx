import React, { useEffect, useState } from "react";
import { IGame } from "../../../../shared/src/interfaces/Game";
import SOCKET_EVENT from "../../../../shared/src/SocketEvent";
import Notification from "../../components/Notification";
import socket from "../../global/socket";
import "./Game.scss";
import GameBoard from "./GameBoard";
import OpponentList from "./OpponentList";
import PlayerHand from "./PlayerHand";
import PlayerStatus from "./PlayerStatus";

interface GameState {
  maxHP: number;
}

const Game = (): JSX.Element => {
  const [chosenCard, setChosenCard] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [state, setState] = useState<GameState>({ maxHP: 0 });

  useEffect(() => {
    socket.on(SOCKET_EVENT.StartTurn, (id: string) => setCurrentPlayer(id));
    socket.on(SOCKET_EVENT.GetGameInfo, ({ maxHP }: IGame) => setState({ maxHP }));

    return (): void => {
      socket.off(SOCKET_EVENT.StartTurn);
      socket.off(SOCKET_EVENT.GetGameInfo);
    };
  }, []);

  return (
    <div className="game" onClick={() => setChosenCard("")}>
      <OpponentList />
      <GameBoard />
      <PlayerStatus />
      <PlayerHand
        currentPlayer={currentPlayer}
        chooseCard={(id: string) => setChosenCard(id)}
        chosenCard={chosenCard}
      />
      <Notification />
    </div>
  );
};

export default Game;
