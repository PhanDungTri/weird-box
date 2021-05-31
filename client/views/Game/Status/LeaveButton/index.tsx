import { useAtom } from "jotai";
import { CLIENT_EVENT_NAME } from "../../../../../shared/constants";
import { routeAtom } from "../../../../atoms";
import Dialog from "../../../../components/Dialog";
import Icon from "../../../../components/Icon";
import { ROUTE } from "../../../../constants";
import useShowDialog from "../../../../hooks/useShowDialog";
import socket from "../../../../services/socket";
import { leaveButtonStyle } from "./styles";

const LeaveButton = (): JSX.Element => {
  const [, setRoute] = useAtom(routeAtom);
  const [shouldDialogShow, dialogAction] = useShowDialog();

  const leave = () => {
    socket.emit(CLIENT_EVENT_NAME.LeaveGame);
    setRoute(ROUTE.Hub);
  };

  return (
    <>
      <Icon name="exit" onClick={dialogAction.reveal} css={leaveButtonStyle} />
      <Dialog
        variation={"Danger"}
        title="leave game"
        yesMessage="yes"
        onYes={leave}
        noMessage="no"
        onNo={dialogAction.hide}
        show={shouldDialogShow}
      >
        <p>Are you sure to leave this game?</p>
      </Dialog>
    </>
  );
};

export default LeaveButton;
