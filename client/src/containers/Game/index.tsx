import React, { useEffect } from "react";
import { SOCKET_EVENT } from "../../../../shared/src/@enums";
import Notification from "../../components/Notification";
import SpellAnimation from "./SpellAnimation";
import socket from "../../services/socket";
import useAppState, { APP_STATE } from "../../state/appState";
import GameBoard from "./GameBoard";
import { GameContextProvider, useGameContext } from "./context";
import "./Game.scss";
import GameOverDialog from "./GameOverDialog";
import Opponents from "./Opponents";
import Player from "./Player";

const Game = (): JSX.Element => {
  const appState = useAppState();
  const { resetCardChoice } = useGameContext();

  const onGameOver = (): void => {
    socket.emit(SOCKET_EVENT.LeaveGame);
    appState.set(APP_STATE.Hub);
  };

  useEffect(() => void socket.emit(SOCKET_EVENT.Ready), []);

  return (
    <div className="game" onClick={resetCardChoice}>
      <Opponents />
      <GameBoard />
      <SpellAnimation id={socket.id} scale={4} />
      <Player />
      <GameOverDialog onClose={onGameOver} />
      <Notification />
    </div>
  );
};

const GameWithContext = (): JSX.Element => {
  return (
    <GameContextProvider>
      <Game />
    </GameContextProvider>
  );
};

export default GameWithContext;
