import { useCallback, useEffect, useState } from "react";
import { CLIENT_EVENT_NAME, GameMatchingStatus, SERVER_EVENT_NAME } from "../../../shared/@types";
import Dialog from "../../components/Dialog";
import Loading from "../../components/Loading";
import COLOR from "../../constants/COLOR";
import socket from "../../services/socket";

type ConfirmStatus = "pending" | "accepted" | "rejected";

const GameConfirmDialog = (): JSX.Element => {
  const [shouldShow, show] = useState(false);
  const [confirm, setConfirm] = useState<ConfirmStatus>("pending");

  const onConfirm = useCallback((isAccepted: boolean) => {
    socket.emit(isAccepted ? CLIENT_EVENT_NAME.Ready : CLIENT_EVENT_NAME.RejectGame);
    setConfirm(isAccepted ? "accepted" : "rejected");
  }, []);

  useEffect(() => {
    if (!shouldShow) setConfirm("pending");
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
      color={confirm === "pending" ? COLOR.Info : confirm === "accepted" ? COLOR.Safe : COLOR.Danger}
      noFooter={confirm !== "pending"}
    >
      {confirm !== "pending" ? (
        <Loading text="Waiting other players..." />
      ) : (
        <p>We found a game for you! Please confirm to join!</p>
      )}
    </Dialog>
  );
};

export default GameConfirmDialog;
