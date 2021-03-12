import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Transition, TransitionGroup } from "react-transition-group";
import { SOCKET_EVENT } from "../../../../shared/src/@enums";
import COLOR from "../../constants/COLOR";
import socket from "../../services/socket";
import useNotificationState from "../../state/notificationState";
import { notificationStyle } from "./styles";

const Notifications = (): JSX.Element => {
  const { notify, notifications } = useNotificationState();

  useEffect(() => {
    socket.on(SOCKET_EVENT.Error, notify("Danger"));
    socket.on(SOCKET_EVENT.Info, notify("Info"));

    return () => {
      socket.off(SOCKET_EVENT.Error);
      socket.off(SOCKET_EVENT.Info);
    };
  }, []);

  return createPortal(
    <TransitionGroup>
      {notifications.map(({ message, variant, id }, i) => (
        <Transition timeout={300} key={id}>
          {(state) => <div css={notificationStyle(COLOR[variant], state)}>{message}</div>}
        </Transition>
      ))}
    </TransitionGroup>,
    document.getElementById("notification") as HTMLDivElement
  );
};

export default Notifications;
