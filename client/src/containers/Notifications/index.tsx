import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Transition, TransitionGroup } from "react-transition-group";
import { SOCKET_EVENT } from "../../../../shared/src/@enums";
import socket from "../../services/socket";
import useNotificationState from "../../state/notificationState";
import Notification from "./Notification";
import { notificationTransition } from "./styles";

const Notifications = (): JSX.Element => {
  const { notify, notifications } = useNotificationState();

  useEffect(() => console.table(notifications), [notifications]);

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
      {notifications.map((n, i) => (
        <Transition timeout={300} key={n.id}>
          {(state) => <Notification {...n} css={notificationTransition(state, notifications.length - 1 - i)} />}
        </Transition>
      ))}
    </TransitionGroup>,
    document.getElementById("notification") as HTMLDivElement
  );
};

export default Notifications;
