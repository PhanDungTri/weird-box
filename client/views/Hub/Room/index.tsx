import { css } from "@emotion/react";
import { useAtom } from "jotai";
import { CLIENT_EVENT_NAME } from "../../../../shared/constants";
import { roomAtom } from "../../../atoms";
import { IntegrateInput } from "../../../components/Input";
import socket from "../../../services/socket";
import { headingStyle } from "../../../styles";
import LeaveRoomButton from "./LeaveRoomButton";
import Members from "./Members";
import { roomStyle } from "./styles";

const Room = (): JSX.Element => {
  const [room] = useAtom(roomAtom);

  const join = (id?: string) => id && socket.emit(CLIENT_EVENT_NAME.JoinRoom, id);

  return (
    <div css={roomStyle}>
      {room ? (
        <>
          <div
            css={[
              css`
                text-align: center;
              `,
              headingStyle,
            ]}
          >
            {room.id}
          </div>
          <Members />
          <LeaveRoomButton />
        </>
      ) : (
        <IntegrateInput placeholder="Enter room code..." onClick={join}>
          Join
        </IntegrateInput>
      )}
    </div>
  );
};

export default Room;
