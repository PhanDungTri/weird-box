import { useAtom } from "jotai";
import { useEffect } from "react";
import { CLIENT_EVENT_NAME, GameMatchingStatus, SERVER_EVENT_NAME } from "../../../shared/@types";
import { routeAtom } from "../../atoms";
import ROUTE from "../../constants/ROUTE";
import socket from "../../services/socket";
import GameBoard from "./GameBoard";
import GameOverDialog from "./GameOverDialog";
import Opponents from "./Opponents";
import Player from "./Player";
import gameStyle from "./styles";

const Game = (): JSX.Element => {
  const [, changeRoute] = useAtom(routeAtom);

  useEffect(() => {
    const onCanceled = (status: GameMatchingStatus) => {
      if (status === "canceled") changeRoute(ROUTE.Hub);
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onNewTurn = (_: string) => void socket.off(SERVER_EVENT_NAME.UpdateGameMatchingStatus, onCanceled);

    socket.emit(CLIENT_EVENT_NAME.Ready);
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
