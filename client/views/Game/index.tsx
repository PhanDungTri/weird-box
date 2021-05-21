import { useAtom } from "jotai";
import { useEffect } from "react";
import { GameMatchingStatus } from "../../../shared/@types";
import { SERVER_EVENT_NAME, CLIENT_EVENT_NAME } from "../../../shared/constants";
import { routeAtom } from "../../atoms";
import { ROUTE } from "../../constants";
import socket from "../../services/socket";
import GameBoard from "./GameBoard";
import GameOverDialog from "./GameOverDialog";
import Opponents from "./Opponents";
import Player from "./Player";
import gameStyle from "./styles";

const Game = (): JSX.Element => {
  const [, changeRoute] = useAtom(routeAtom);

  useEffect(() => {
    const onCanceled = (status: GameMatchingStatus) => status === "Canceled" && changeRoute(ROUTE.Hub);
    const onNewTurn = () => void socket.off(SERVER_EVENT_NAME.UpdateGameMatchingStatus, onCanceled);

    socket.emit(CLIENT_EVENT_NAME.ReadyConfirm, true);
    socket.once(SERVER_EVENT_NAME.UpdateGameMatchingStatus, onCanceled);
    socket.once(SERVER_EVENT_NAME.NewTurn, onNewTurn);
  }, []);

  return (
    <div css={gameStyle}>
      <Opponents />
      <GameBoard />
      <Player />
      <GameOverDialog />
    </div>
  );
};

export default Game;
