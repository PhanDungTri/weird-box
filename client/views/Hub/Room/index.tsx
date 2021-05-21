import { css } from "@emotion/react";
import { useAtom } from "jotai";
import { CLIENT_EVENT_NAME } from "../../../../shared/constants";
import { roomAtom } from "../../../atoms";
import Button from "../../../components/Button";
import Dialog from "../../../components/Dialog";
import DropDown from "../../../components/Dropdown";
import EmptySlot from "../../../components/EmptySlot";
import { IntegrateInput } from "../../../components/Input";
import COLOR from "../../../constants/COLOR";
import useShowDialog from "../../../hooks/useShowDialog";
import socket from "../../../services/socket";
import { headingStyle } from "../../../styles";
import Member from "./Member";
import { memberListStyle, roomStyle } from "./styles";

const Room = (): JSX.Element => {
  const [room] = useAtom(roomAtom);
  const [shouldLeaveDialogShow, leaveDialogActions] = useShowDialog();
  const [shouldKickDialogShow, kickDialogActions] = useShowDialog();

  const leave = () => {
    socket.emit(CLIENT_EVENT_NAME.LeaveRoom);
    leaveDialogActions.hide();
  };

  const join = (id?: string) => id && socket.emit(CLIENT_EVENT_NAME.JoinRoom, id);

  const generateList = () => {
    const arr: JSX.Element[] = [];

    for (let i = 0; i < 4; i++) {
      const member = room?.members[i];
      if (member) {
        const component = <Member id={member.id} name={member.name} />;

        const kick = () => {
          socket.emit(CLIENT_EVENT_NAME.Kick, member.id);
          kickDialogActions.hide();
        };

        arr.push(
          socket.id === room?.owner && member.id !== socket.id ? (
            <>
              <DropDown header={component} top>
                <Button variation="Danger" onClick={kickDialogActions.reveal}>
                  Kick
                </Button>
              </DropDown>

              <Dialog
                color={COLOR.Danger}
                title="kick player"
                yesMessage="yes"
                onYes={kick}
                noMessage="no"
                onNo={kickDialogActions.hide}
                show={shouldKickDialogShow}
              >
                <p>Are you sure to kick {member.name}? This player can not join this room anymore!</p>
              </Dialog>
            </>
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
          <Button variation="Danger" onClick={leaveDialogActions.reveal}>
            Leave
          </Button>
          <Dialog
            color={COLOR.Danger}
            title="leave game"
            yesMessage="yes"
            onYes={leave}
            noMessage="no"
            onNo={leaveDialogActions.hide}
            show={shouldLeaveDialogShow}
          >
            <p>Are you sure to leave this room?</p>
          </Dialog>
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
