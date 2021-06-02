import { useAtom } from "jotai";
import { useState } from "react";
import { languageAtom } from "../atoms";
import Dialog from "../components/Dialog";
import Loading from "../components/Loading";
import { useListenServerEvent } from "../hooks";
import useShowDialog from "../hooks/useShowDialog";
import socket from "../services/socket";

const ReconnectDialog = (): JSX.Element => {
  const [shouldShow, action] = useShowDialog();
  const [shouldReconnect, reconnect] = useState(false);
  const [language] = useAtom(languageAtom);

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
      title={language.errConnectTitle}
      yesMessage={language.reconnect}
      onYes={onReconnect}
      variation={"Danger"}
      noFooter={shouldReconnect}
    >
      {shouldReconnect ? <Loading text={`${language.reconnectMessage}...`} /> : <p>{language.failConnect}</p>}
    </Dialog>
  );
};

export default ReconnectDialog;
