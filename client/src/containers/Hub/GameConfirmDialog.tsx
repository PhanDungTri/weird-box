import { useEffect, useState } from "react";
import { SOCKET_EVENT } from "../../../../shared/src/@enums";
import Dialog from "../../components/Dialog";
import APP_STATE from "../../constants/APP_STATE";
import COLOR from "../../constants/COLOR";
import useAppStateTransition from "../../hooks/useAppStateTransition";
import socket from "../../services/socket";

const GameConfirmDialog = (): JSX.Element => {
  const [, setAppState] = useAppStateTransition();
  const [shouldBeShown, show] = useState(false);

  const onRejectGame = () => {
    socket.emit(SOCKET_EVENT.RejectGame);
    show(false);
  };

  useEffect(() => {
    socket.once(SOCKET_EVENT.GameFound, () => show(true));
  }, []);

  return (
    <Dialog
      show={!!shouldBeShown}
      title="Game found"
      confirmMessage="Accept"
      onConfirm={() => setAppState(APP_STATE.InGame)}
      cancelMessage="Reject"
      onCancel={onRejectGame}
      color={COLOR.Info}
    >
      <p>We found a game for you! Please confirm to join!</p>
    </Dialog>
  );
};

export default GameConfirmDialog;
