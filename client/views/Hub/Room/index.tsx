import { css } from "@emotion/react";
import { useAtom } from "jotai";
import { CLIENT_EVENT_NAME } from "../../../../shared/constants";
import { roomAtom } from "../../../atoms";
import Button from "../../../components/Button";
import DropDown from "../../../components/Dropdown";
import EmptySlot from "../../../components/EmptySlot";
import { IntegrateInput } from "../../../components/Input";
import socket from "../../../services/socket";
import { headingStyle } from "../../../styles";
import Member from "./Member";
import { memberListStyle, roomStyle } from "./styles";

const Room = (): JSX.Element => {
  const [room] = useAtom(roomAtom);

  const leave = () => socket.emit(CLIENT_EVENT_NAME.LeaveRoom);
  const join = (id?: string) => id && socket.emit(CLIENT_EVENT_NAME.JoinRoom, id);

  const generateList = () => {
    const arr: JSX.Element[] = [];

    for (let i = 0; i < 4; i++) {
      const member = room?.members[i];
      if (member) {
        const component = <Member id={member.id} name={member.name} />;

        const kick = () => socket.emit(CLIENT_EVENT_NAME.Kick, member.id);

        arr.push(
          socket.id === room?.owner && member.id !== socket.id ? (
            <DropDown header={component} top>
              <Button variation="Danger" onClick={kick}>
                Kick
              </Button>
            </DropDown>
          ) : (
            component
          )
        );
      } else arr.push(<EmptySlot key={i} />);
    }

    return arr;
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
          <Button variation="Danger" onClick={leave}>
            Leave
          </Button>
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
