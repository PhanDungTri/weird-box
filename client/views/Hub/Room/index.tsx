import { useAtom } from "jotai";
import { CLIENT_EVENT_NAME } from "../../../../shared/constants";
import { roomAtom } from "../../../atoms";
import H1 from "../../../components/H1";
import IntegrateInput from "../../../components/IntegrateInput";
import socket from "../../../services/socket";
import LeaveRoomButton from "./LeaveRoomButton";
import Members from "./Members";
import { StyledRoom } from "./styles";

const Room = (): JSX.Element => {
  const [room] = useAtom(roomAtom);

  const join = (id?: string) => id && socket.emit(CLIENT_EVENT_NAME.JoinRoom, id);

  return (
    <StyledRoom>
      {room ? (
        <>
          <H1 css={{ textAlign: "center" }}>{room.id}</H1>
          <Members />
          <LeaveRoomButton />
        </>
      ) : (
        <IntegrateInput placeholder="Enter room code..." onClick={join}>
          Join
        </IntegrateInput>
      )}
    </StyledRoom>
  );
};

export default Room;
