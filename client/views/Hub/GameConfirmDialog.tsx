import { useEffect, useState } from "react";
import { SOCKET_EVENT } from "../../../shared/constants";
import Dialog from "../../components/Dialog";
import Loading from "../../components/Loading";
import COLOR from "../../constants/COLOR";
import { useAppState } from "../../hooks/useStore";
import socket from "../../services/socket";

type GameConfirmDialogProps = {
  onClose?: () => void;
};

const GameConfirmDialog = ({ onClose }: GameConfirmDialogProps): JSX.Element => {
  const shouldShow = useAppState((state) => state.findingStatus === "found");
  const setFindingStatus = useAppState((state) => state.setFindingStatus);
  const [isAccepted, accept] = useState(false);

  const onReject = () => {
    socket.emit(SOCKET_EVENT.RejectGame);
    if (onClose) onClose();
    setFindingStatus("canceled");
  };

  const onAccept = () => {
    socket.emit(SOCKET_EVENT.AcceptGame);
    accept(true);
  };

  useEffect(() => {
    if (!shouldShow) accept(false);
  }, [shouldShow]);

  return (
    <Dialog
      show={shouldShow}
      title="Game found"
      confirmMessage="Accept"
      onConfirm={onAccept}
      cancelMessage="Reject"
      onCancel={onReject}
      color={COLOR.Info}
      noFooter={isAccepted}
    >
      {isAccepted ? (
        <Loading text="Waiting other players..." />
      ) : (
        <p>We found a game for you! Please confirm to join!</p>
      )}
    </Dialog>
  );
};

export default GameConfirmDialog;
