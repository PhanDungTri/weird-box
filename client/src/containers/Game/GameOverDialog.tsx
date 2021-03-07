import { useEffect, useState } from "react";
import { SOCKET_EVENT } from "../../../../shared/src/@enums";
import { PlayerInfo } from "../../@types";
import Dialog from "../../components/Dialog";
import socket from "../../services/socket";
import useAppState, { APP_STATE } from "../../state/appState";

const GameOverDialog = (): JSX.Element => {
  const appState = useAppState();
  const [winner, setWinner] = useState<PlayerInfo>();

  const onGameOver = () => {
    socket.emit(SOCKET_EVENT.LeaveGame);
    appState.set(APP_STATE.Hub);
  };

  useEffect(() => {
    socket.once(SOCKET_EVENT.GameOver, (winner: PlayerInfo) => setWinner(winner));
  }, []);

  return (
    <Dialog
      show={!!winner}
      title={winner?.id === socket.id ? "victory" : "defeated"}
      onConfirm={onGameOver}
      confirmMessage="Back to Hub"
      color={winner?.id === socket.id ? "#ece236" : "#122c4f"}
    >
      {winner?.id === socket.id ? <p>You are the Winner!</p> : <p>{winner?.name} is the winner!</p>}
    </Dialog>
  );
};

export default GameOverDialog;
