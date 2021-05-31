import { useState } from "react";
import Dialog from "../components/Dialog";
import Loading from "../components/Loading";
import { useListenServerEvent } from "../hooks";
import useShowDialog from "../hooks/useShowDialog";
import socket from "../services/socket";

const ReconnectDialog = (): JSX.Element => {
  const [shouldShow, action] = useShowDialog();
  const [shouldReconnect, reconnect] = useState(false);

  const onReconnect = () => {
    socket.connect();
    reconnect(true);
  };

  useListenServerEvent("connect_error", () => {
    action.reveal();
    reconnect(false);
  });

  useListenServerEvent("connect", action.hide);

  return (
    <Dialog
      show={shouldShow}
      title="connection error"
      yesMessage="reconnect"
      onYes={onReconnect}
      variation={"Danger"}
      noFooter={shouldReconnect}
    >
      {shouldReconnect ? <Loading text="Reconnecting..." /> : <p>Failed to contact with the server!</p>}
    </Dialog>
  );
};

export default ReconnectDialog;
