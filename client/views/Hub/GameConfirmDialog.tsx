import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { GameMatchingStatus } from "../../../shared/@types";
import { CLIENT_EVENT_NAME, SERVER_EVENT_NAME } from "../../../shared/constants";
import { soundAtom } from "../../atoms";
import Dialog from "../../components/Dialog";
import Loading from "../../components/Loading";
import { COLOR } from "../../constants";
import { useListenServerEvent } from "../../hooks";
import socket from "../../services/socket";

type ConfirmStatus = "pending" | "accepted" | "rejected";

const GameConfirmDialog = (): JSX.Element => {
  const [sound] = useAtom(soundAtom);
  const [shouldShow, show] = useState(false);
  const [confirm, setConfirm] = useState<ConfirmStatus>("pending");

  const onConfirm = (isAccepted: boolean) => {
    socket.emit(CLIENT_EVENT_NAME.ReadyConfirm, isAccepted);

    if (isAccepted) setConfirm("accepted");
    else setConfirm("rejected");
  };

  const onYes = () => onConfirm(true);
  const onNo = () => onConfirm(false);

  useEffect(() => {
    if (!shouldShow) setConfirm("pending");
    else sound?.play("GameFound");
  }, [shouldShow]);

  useListenServerEvent(SERVER_EVENT_NAME.UpdateGameMatchingStatus, (status: GameMatchingStatus) =>
    show(status === "Found")
  );

  return (
    <Dialog
      show={shouldShow}
      title="Game found"
      yesMessage="Accept"
      onYes={onYes}
      noMessage="Reject"
      onNo={onNo}
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
