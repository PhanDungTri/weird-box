import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { GameMatchingStatus } from "../../../shared/@types";
import { CLIENT_EVENT_NAME, SERVER_EVENT_NAME } from "../../../shared/constants";
import { languageAtom, soundAtom } from "../../atoms";
import Dialog from "../../components/Dialog";
import Loading from "../../components/Loading";
import { useListenServerEvent } from "../../hooks";
import socket from "../../services/socket";

type ConfirmStatus = "pending" | "accepted" | "rejected";

const GameConfirmDialog = (): JSX.Element => {
  const [sound] = useAtom(soundAtom);
  const [language] = useAtom(languageAtom);
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
      title={language.gameFound}
      yesMessage={language.accept}
      onYes={onYes}
      noMessage={language.reject}
      onNo={onNo}
      variation={confirm === "pending" ? "Info" : confirm === "accepted" ? "Safe" : "Danger"}
      noFooter={confirm !== "pending"}
    >
      {confirm !== "pending" ? <Loading text={`${language.waitingPlayers}...`} /> : <p>{language.gameFoundMessage}</p>}
    </Dialog>
  );
};

export default GameConfirmDialog;
