import Sprite from "../../../../components/Sprite";
import LeaveIcon from "../../../../assets/sprites/leave.png";
import socket from "../../../../services/socket";
import { CLIENT_EVENT_NAME } from "../../../../../shared/constants";
import { leaveButtonStyle } from "./styles";
import { useAtom } from "jotai";
import { routeAtom } from "../../../../atoms";
import ROUTE from "../../../../constants/ROUTE";

const LeaveButton = (): JSX.Element => {
  const [, setRoute] = useAtom(routeAtom);

  const leave = () => {
    socket.emit(CLIENT_EVENT_NAME.LeaveGame);
    setRoute(ROUTE.Hub);
  };

  return <Sprite src={LeaveIcon} size={[24, 24]} onClick={leave} css={leaveButtonStyle} />;
};

export default LeaveButton;
