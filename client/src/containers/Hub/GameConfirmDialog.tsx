import { useEffect, useState } from "react";
import { SOCKET_EVENT } from "../../../../shared/src/@enums";
import Dialog from "../../components/Dialog";
import COLOR from "../../constants/COLOR";
import socket from "../../services/socket";

type GameConfirmDialogProps = {
  onClose?: () => void;
};

const GameConfirmDialog = ({ onClose }: GameConfirmDialogProps): JSX.Element => {
  const [shouldBeShown, show] = useState(false);
  const [isAccepted, accept] = useState(false);

  const onReject = () => {
    socket.emit(SOCKET_EVENT.RejectGame);
    if (onClose) onClose();
    show(false);
  };

  const onAccept = () => {
    socket.emit(SOCKET_EVENT.AcceptGame);
    accept(true);
  };

  useEffect(() => {
    socket.on(SOCKET_EVENT.GameFound, () => show(true));
    socket.on(SOCKET_EVENT.GameCanceled, () => {
      show(false);
      accept(false);
    });

    return () => {
      socket.off(SOCKET_EVENT.GameFound);
      socket.off(SOCKET_EVENT.GameCanceled);
    };
  }, []);

  return (
    <Dialog
      show={!!shouldBeShown}
      title="Game found"
      confirmMessage="Accept"
      onConfirm={onAccept}
      cancelMessage="Reject"
      onCancel={onReject}
      color={COLOR.Info}
    >
      <p>{isAccepted ? "Waiting other players..." : "We found a game for you! Please confirm to join!"}</p>
    </Dialog>
  );
};

export default GameConfirmDialog;
