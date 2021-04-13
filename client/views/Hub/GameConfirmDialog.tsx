import { useCallback, useEffect, useState } from "react";
import { CLIENT_EVENT_NAME, GameMatchingStatus, SERVER_EVENT_NAME } from "../../../shared/@types";
import Dialog from "../../components/Dialog";
import Loading from "../../components/Loading";
import COLOR from "../../constants/COLOR";
import socket from "../../services/socket";

const GameConfirmDialog = (): JSX.Element => {
  const [shouldShow, show] = useState(false);
  const [shouldAccept, accept] = useState<boolean>();
  const [shouldConfirm, confirm] = useState(false);

  const onConfirm = useCallback((isAccepted: boolean) => {
    socket.emit(isAccepted ? CLIENT_EVENT_NAME.Ready : CLIENT_EVENT_NAME.RejectGame);
    accept(isAccepted);
    confirm(true);
  }, []);

  useEffect(() => {
    if (!shouldShow) confirm(false);
  }, [shouldShow]);

  useEffect(() => {
    const onUpdateGameMatchingStatus = (status: GameMatchingStatus) => show(status === "found");
    socket.on(SERVER_EVENT_NAME.UpdateGameMatchingStatus, onUpdateGameMatchingStatus);
    return () => void socket.off(SERVER_EVENT_NAME.UpdateGameMatchingStatus, onUpdateGameMatchingStatus);
  }, []);

  return (
    <Dialog
      show={shouldShow}
      title="Game found"
      confirmMessage="Accept"
      onConfirm={() => onConfirm(true)}
      cancelMessage="Reject"
      onCancel={() => onConfirm(false)}
      color={shouldAccept === undefined ? COLOR.Info : shouldAccept ? COLOR.Safe : COLOR.Danger}
      noFooter={shouldConfirm}
    >
      {shouldConfirm ? (
        <Loading text="Waiting other players..." />
      ) : (
        <p>We found a game for you! Please confirm to join!</p>
      )}
    </Dialog>
  );
};

export default GameConfirmDialog;
