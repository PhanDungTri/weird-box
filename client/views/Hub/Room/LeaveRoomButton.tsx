import { useAtom } from "jotai";
import { CLIENT_EVENT_NAME } from "../../../../shared/constants";
import { languageAtom } from "../../../atoms";
import Button from "../../../components/Button";
import Dialog from "../../../components/Dialog";
import useShowDialog from "../../../hooks/useShowDialog";
import socket from "../../../services/socket";

const LeaveRoomButton = (): JSX.Element => {
  const [shouldDialogShow, dialogAction] = useShowDialog();
  const [language] = useAtom(languageAtom);

  const leave = () => {
    socket.emit(CLIENT_EVENT_NAME.LeaveRoom);
    dialogAction.hide();
  };

  return (
    <>
      <Button variation="Danger" onClick={dialogAction.reveal}>
        {language.leave}
      </Button>
      <Dialog
        variation={"Danger"}
        title={language.confirmation}
        yesMessage={language.yes}
        onYes={leave}
        noMessage={language.no}
        onNo={dialogAction.hide}
        show={shouldDialogShow}
      >
        <p>{language.leaveMessage}</p>
      </Dialog>
    </>
  );
};

export default LeaveRoomButton;
