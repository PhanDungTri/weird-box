import { useEffect, useState } from "react";
import { SOCKET_EVENT } from "../../../../shared/src/@enums";
import { PlayerInfo } from "../../@types";
import Dialog from "../../components/Dialog";
import ROUTE from "../../constants/ROUTE";
import socket from "../../services/socket";
import useAppStateTransition from "../../hooks/useAppStateTransition";

const GameOverDialog = (): JSX.Element => {
  const [, setAppState] = useAppStateTransition();
  const [winner, setWinner] = useState<PlayerInfo>();

  const onGameOver = () => {
    socket.emit(SOCKET_EVENT.LeaveGame);
    setAppState(ROUTE.Hub);
  };

  useEffect(() => {
    socket.once(SOCKET_EVENT.GameOver, (winner: PlayerInfo) => setWinner(winner));
  }, []);

  return (
    <Dialog
      show={!!winner}
      title={winner?.id === socket.id ? "victory" : "defeated"}
      confirmMessage="Back to Hub"
      onConfirm={onGameOver}
      color={winner?.id === socket.id ? "#ece236" : "#122c4f"}
    >
      {winner?.id === socket.id ? <p>You are the Winner!</p> : <p>{winner?.name} is the winner!</p>}
    </Dialog>
  );
};

export default GameOverDialog;
