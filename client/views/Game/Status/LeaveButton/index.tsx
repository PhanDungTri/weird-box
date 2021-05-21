import { useAtom } from "jotai";
import { CLIENT_EVENT_NAME } from "../../../../../shared/constants";
import LeaveIcon from "../../../../assets/sprites/leave.png";
import { routeAtom } from "../../../../atoms";
import Dialog from "../../../../components/Dialog";
import Sprite from "../../../../components/Sprite";
import { COLOR, ROUTE } from "../../../../constants";
import useShowDialog from "../../../../hooks/useShowDialog";
import socket from "../../../../services/socket";
import { leaveButtonStyle } from "./styles";

const LeaveButton = (): JSX.Element => {
  const [, setRoute] = useAtom(routeAtom);
  const [shouldDialogShow, dialogActions] = useShowDialog();

  const leave = () => {
    socket.emit(CLIENT_EVENT_NAME.LeaveGame);
    setRoute(ROUTE.Hub);
  };

  return (
    <>
      <Sprite src={LeaveIcon} size={[24, 24]} onClick={dialogActions.reveal} css={leaveButtonStyle} />
      <Dialog
        color={COLOR.Danger}
        title="leave game"
        yesMessage="yes"
        onYes={leave}
        noMessage="no"
        onNo={dialogActions.hide}
        show={shouldDialogShow}
      >
        <p>Are you sure to leave this game?</p>
      </Dialog>
    </>
  );
};

export default LeaveButton;
