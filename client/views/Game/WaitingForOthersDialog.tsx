import { useEffect } from "react";
import { SERVER_EVENT_NAME } from "../../../shared/constants";
import Dialog from "../../components/Dialog";
import Loading from "../../components/Loading";
import useShowDialog from "../../hooks/useShowDialog";
import socket from "../../services/socket";

const WaitingForOthersDialog = (): JSX.Element => {
  const [shouldShow, action] = useShowDialog(true);

  useEffect(() => void socket.once(SERVER_EVENT_NAME.NewTurn, action.hide), []);

  return (
    <Dialog show={shouldShow} title="Prepare" yesMessage="Accept" noFooter>
      <Loading text="Waiting other players to connect ..." />
    </Dialog>
  );
};

export default WaitingForOthersDialog;
