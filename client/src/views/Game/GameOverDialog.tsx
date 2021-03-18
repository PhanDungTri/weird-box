import { SOCKET_EVENT } from "../../../../shared/src/@enums";
import Dialog from "../../components/Dialog";
import ROUTE from "../../constants/ROUTE";
import { useAppState, useGameState } from "../../hooks/useStore";
import socket from "../../services/socket";

const GameOverDialog = (): JSX.Element => {
  const changeRoute = useAppState((state) => state.changeRoute);
  const winner = useGameState((state) => state.winner);
  const resetGameState = useGameState((state) => state.reset);

  const onGameOver = () => {
    socket.emit(SOCKET_EVENT.LeaveGame);
    resetGameState();
    changeRoute(ROUTE.Hub);
  };

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
