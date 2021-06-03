import { useAtom } from "jotai";
import { CLIENT_EVENT_NAME } from "../../../../shared/constants";
import { languageAtom, roomAtom } from "../../../atoms";
import H1 from "../../../components/H1";
import IntegrateInput from "../../../components/IntegrateInput";
import socket from "../../../services/socket";
import LeaveRoomButton from "./LeaveRoomButton";
import Members from "./Members";
import { StyledRoom } from "./styles";

const Room = (): JSX.Element => {
  const [room] = useAtom(roomAtom);
  const [language] = useAtom(languageAtom);

  const join = (id?: string) => id && socket.emit(CLIENT_EVENT_NAME.JoinRoom, id);

  return (
    <StyledRoom>
      {room ? (
        <>
          <H1 css={{ textAlign: "center", fontSize: "16px" }}>
            {language.roomCode}: {room.id}
          </H1>
          <Members />
          <LeaveRoomButton />
        </>
      ) : (
        <IntegrateInput placeholder={`${language.roomCodePlaceholder}...`} onClick={join}>
          {language.join}
        </IntegrateInput>
      )}
    </StyledRoom>
  );
};

export default Room;
