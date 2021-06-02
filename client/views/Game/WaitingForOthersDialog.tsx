import { useAtom } from "jotai";
import { useEffect } from "react";
import { SERVER_EVENT_NAME } from "../../../shared/constants";
import { languageAtom, musicAtom } from "../../atoms";
import Dialog from "../../components/Dialog";
import Loading from "../../components/Loading";
import useShowDialog from "../../hooks/useShowDialog";
import socket from "../../services/socket";

const WaitingForOthersDialog = (): JSX.Element => {
  const [shouldShow, action] = useShowDialog(true);
  const [music] = useAtom(musicAtom);
  const [language] = useAtom(languageAtom);

  useEffect(
    () =>
      void socket.once(SERVER_EVENT_NAME.NewTurn, () => {
        action.hide();
        music?.stop();
      }),
    []
  );

  return (
    <Dialog show={shouldShow} title={language.prepare} noFooter>
      <Loading text={language.waitingPlayers + "..."} />
    </Dialog>
  );
};

export default WaitingForOthersDialog;
