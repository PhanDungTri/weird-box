import { useAtom } from "jotai";
import { CLIENT_EVENT_NAME } from "../../../../../shared/constants";
import { roomAtom } from "../../../../atoms";
import Button from "../../../../components/Button";
import Dialog from "../../../../components/Dialog";
import DropDown from "../../../../components/Dropdown";
import EmptySlot from "../../../../components/EmptySlot";
import { COLOR } from "../../../../constants";
import useShowDialog from "../../../../hooks/useShowDialog";
import socket from "../../../../services/socket";
import Member from "./Member";
import { memberListStyle } from "./styles";

const Members = (): JSX.Element => {
  const [room] = useAtom(roomAtom);
  const [shouldDialogShow, dialogAction] = useShowDialog();

  const generateList = () => {
    const arr: JSX.Element[] = [];

    for (let i = 0; i < 4; i++) {
      const member = room?.members[i];
      if (member) {
        const component = <Member key={member.id} id={member.id} name={member.name} />;

        const kick = () => {
          socket.emit(CLIENT_EVENT_NAME.Kick, member.id);
          dialogAction.hide();
        };

        arr.push(
          socket.id === room?.owner && member.id !== socket.id ? (
            <>
              <DropDown key={member.id} header={component} top>
                <Button variation="Danger" onClick={dialogAction.reveal}>
                  Kick
                </Button>
              </DropDown>

              <Dialog
                key={member.id}
                color={COLOR.Danger}
                title="kick player"
                yesMessage="yes"
                onYes={kick}
                noMessage="no"
                onNo={dialogAction.hide}
                show={shouldDialogShow}
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

  return <div css={memberListStyle}>{generateList()}</div>;
};

export default Members;
