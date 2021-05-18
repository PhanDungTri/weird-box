import { Howl } from "howler";
import { useEffect, useState } from "react";
import { GameMatchingStatus } from "../../../shared/@types";
import { CLIENT_EVENT_NAME, SERVER_EVENT_NAME } from "../../../shared/constants";
import AcceptSound from "../../assets/sounds/accept_game.mp3";
import FoundGameSound from "../../assets/sounds/found_game.mp3";
import RejectSound from "../../assets/sounds/reject_game.mp3";
import Dialog from "../../components/Dialog";
import Loading from "../../components/Loading";
import COLOR from "../../constants/COLOR";
import { useListenServerEvent } from "../../hooks";
import socket from "../../services/socket";

type ConfirmStatus = "pending" | "accepted" | "rejected";

const GameConfirmDialog = (): JSX.Element => {
  const [shouldShow, show] = useState(false);
  const [confirm, setConfirm] = useState<ConfirmStatus>("pending");
  const [showSound] = useState(new Howl({ src: [FoundGameSound] }));
  const [acceptSound] = useState(new Howl({ src: [AcceptSound] }));
  const [rejectSound] = useState(new Howl({ src: [RejectSound] }));

  const onConfirm = (isAccepted: boolean) => {
    socket.emit(CLIENT_EVENT_NAME.ReadyConfirm, isAccepted);

    if (isAccepted) {
      setConfirm("accepted");
      acceptSound.play();
    } else {
      setConfirm("rejected");
      rejectSound.play();
    }
  };

  const onYes = () => onConfirm(true);
  const onNo = () => onConfirm(false);

  useEffect(() => {
    if (!shouldShow) setConfirm("pending");
    else showSound.play();
  }, [shouldShow]);

  useListenServerEvent(SERVER_EVENT_NAME.UpdateGameMatchingStatus, (status: GameMatchingStatus) =>
    show(status === "found")
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
