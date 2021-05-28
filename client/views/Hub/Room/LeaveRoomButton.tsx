import { CLIENT_EVENT_NAME } from "../../../../shared/constants";
import Button from "../../../components/Button";
import Dialog from "../../../components/Dialog";
import { COLOR } from "../../../constants";
import useShowDialog from "../../../hooks/useShowDialog";
import socket from "../../../services/socket";

const LeaveRoomButton = (): JSX.Element => {
  const [shouldDialogShow, dialogAction] = useShowDialog();

  const leave = () => {
    socket.emit(CLIENT_EVENT_NAME.LeaveRoom);
    dialogAction.hide();
  };

  return (
    <>
      <Button variation="Danger" onClick={dialogAction.reveal}>
        Leave
      </Button>
      <Dialog
        color={COLOR.Danger}
        title="leave game"
        yesMessage="yes"
        onYes={leave}
        noMessage="no"
        onNo={dialogAction.hide}
        show={shouldDialogShow}
      >
        <p>Are you sure to leave this room?</p>
      </Dialog>
    </>
  );
};

export default LeaveRoomButton;
