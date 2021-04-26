import { css } from "@emotion/react";
import produce from "immer";
import { useAtom } from "jotai";
import { ClientInfo, RoomInfo } from "../../../../shared/@types";
import { CLIENT_EVENT_NAME, SERVER_EVENT_NAME } from "../../../../shared/constants";
import PlayerAvatar from "../../../assets/sprites/white_gamepad.png";
import EmptySlot from "../../../components/EmptySlot";
import { IntegrateInput } from "../../../components/Input";
import Sprite from "../../../components/Sprite";
import { useListenServerEvent } from "../../../hooks";
import socket from "../../../services/socket";
import { headingStyle } from "../../../styles";
import { roomAtom } from "../atom";
import { memberListStyle, memberStyle, roomStyle } from "./styles";

const Room = (): JSX.Element => {
  const [room, setRoom] = useAtom(roomAtom);

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

  useListenServerEvent(SERVER_EVENT_NAME.GetRoomInfo, (info: RoomInfo) => setRoom(info));
  useListenServerEvent(SERVER_EVENT_NAME.FriendJoined, (friend: ClientInfo) =>
    setRoom((room) =>
      produce(room, (draft) => {
        draft?.members.push(friend);
      })
    )
  );

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
