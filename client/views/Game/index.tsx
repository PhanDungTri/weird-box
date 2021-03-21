import { useEffect } from "react";
import { SOCKET_EVENT } from "../../../shared/constants";
import Loading from "../../components/Loading";
import { useGameState } from "../../hooks/useStore";
import socket from "../../services/socket";
import GameBoard from "./GameBoard";
import GameOverDialog from "./GameOverDialog";
import Opponents from "./Opponents";
import Player from "./Player";
import gameStyle from "./styles";

const Game = (): JSX.Element => {
  const isLoaded = useGameState((state) => !!Object.keys(state.players).length);
  useEffect(() => void socket.emit(SOCKET_EVENT.Ready), []);

  return isLoaded ? (
    <div css={gameStyle}>
      <Opponents />
      <GameBoard />
      <Player />
      <GameOverDialog />
    </div>
  ) : (
    <Loading text="Loading" />
  );
};

export default Game;
