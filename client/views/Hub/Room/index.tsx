import { css } from "@emotion/react";
import { useAtom } from "jotai";
import { CLIENT_EVENT_NAME } from "../../../../shared/constants";
import PlayerAvatar from "../../../assets/sprites/white_gamepad.png";
import { roomAtom } from "../../../atoms";
import EmptySlot from "../../../components/EmptySlot";
import { IntegrateInput } from "../../../components/Input";
import Sprite from "../../../components/Sprite";
import socket from "../../../services/socket";
import { headingStyle } from "../../../styles";
import { memberListStyle, memberStyle, roomStyle } from "./styles";

const Room = (): JSX.Element => {
  const [room] = useAtom(roomAtom);

  const generateList = () => {
    const arr: JSX.Element[] = [];

    for (let i = 0; i < 4; i++) {
      const member = room?.members[i];
      if (member) {
        arr.push(
          <div css={memberStyle} key={member.id}>
            <Sprite
              css={css`
                position: relative;
                display: block;
              `}
              src={PlayerAvatar}
              size={[24, 13]}
            />
            <div
              css={css`
                font-size: 8px;
                text-align: center;
                word-break: break-all;
              `}
            >
              {member.name}
            </div>
          </div>
        );
      } else arr.push(<EmptySlot key={i} />);
    }

    return arr;
  };

  const join = (id?: string) => {
    if (id) socket.emit(CLIENT_EVENT_NAME.JoinRoom, id);
  };

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
          <div css={memberListStyle}>{generateList()}</div>
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
