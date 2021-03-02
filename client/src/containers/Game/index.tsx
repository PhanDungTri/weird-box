import { useEffect } from "react";
import { SOCKET_EVENT } from "../../../../shared/src/@enums";
import Notification from "../../components/Notification";
import socket from "../../services/socket";
import useAppState, { APP_STATE } from "../../state/appState";
import { GameContextProvider } from "./context";
import GameBoard from "./GameBoard";
import GameOverDialog from "./GameOverDialog";
import Opponents from "./Opponents";
import Player from "./Player";
import SpellAnimation from "./SpellAnimation";
import gameStyle from "./styles";

const Game = (): JSX.Element => {
  const appState = useAppState();

  const onGameOver = (): void => {
    socket.emit(SOCKET_EVENT.LeaveGame);
    appState.set(APP_STATE.Hub);
  };

  useEffect(() => void socket.emit(SOCKET_EVENT.Ready), []);

  return (
    <div css={gameStyle}>
      <Opponents />
      <GameBoard />
      <Player />
      <SpellAnimation id={socket.id} scale={4} />
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
