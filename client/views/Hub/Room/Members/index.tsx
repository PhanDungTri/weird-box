import { useAtom } from "jotai";
import { CLIENT_EVENT_NAME } from "../../../../../shared/constants";
import { languageAtom, roomAtom } from "../../../../atoms";
import Button from "../../../../components/Button";
import Dialog from "../../../../components/Dialog";
import DropDown from "../../../../components/Dropdown";
import EmptySlot from "../../../../components/EmptySlot";
import useShowDialog from "../../../../hooks/useShowDialog";
import socket from "../../../../services/socket";
import Member from "./Member";
import { StyledMembers } from "./styles";

const Members = (): JSX.Element => {
  const [room] = useAtom(roomAtom);
  const [language] = useAtom(languageAtom);
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
              <DropDown key={member.id} header={component} onTop>
                <Button variation="Danger" onClick={dialogAction.reveal}>
                  {language.kick}
                </Button>
              </DropDown>

              <Dialog
                key={"dialog-" + member.id}
                variation={"Danger"}
                title={language.confirmation}
                yesMessage={language.yes}
                onYes={kick}
                noMessage={language.no}
                onNo={dialogAction.hide}
                show={shouldDialogShow}
              >
                <p>
                  {language.kick} {member.name}? {language.roomKickMessage}
                </p>
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

  return <StyledMembers>{generateList()}</StyledMembers>;
};

export default Members;
