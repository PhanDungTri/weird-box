import { useEffect } from "react";
import { SOCKET_EVENT } from "../../../../shared/src/@enums";
import Notification from "../../components/Notification";
import socket from "../../services/socket";
import { GameContextProvider } from "./context";
import GameBoard from "./GameBoard";
import GameOverDialog from "./GameOverDialog";
import Opponents from "./Opponents";
import Player from "./Player";
import SpellAnimation from "./SpellAnimation";
import gameStyle from "./styles";

const Game = (): JSX.Element => {
  useEffect(() => void socket.emit(SOCKET_EVENT.Ready), []);

  return (
    <div css={gameStyle}>
      <Opponents />
      <GameBoard />
      <Player />
      <SpellAnimation id={socket.id} scale={4} />
      <GameOverDialog />
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
