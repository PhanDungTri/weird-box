import { useEffect } from "react";
import { createPortal } from "react-dom";
import { animated, useTransition } from "react-spring";
import { SOCKET_EVENT } from "../../../../shared/src/@enums";
import COLOR from "../../constants/COLOR";
import useNotification from "../../hooks/useNotification";
import socket from "../../services/socket";
import { notificationStyle } from "./styles";

const Notifications = (): JSX.Element => {
  const { notify, notifications } = useNotification();
  const transitions = useTransition(notifications, (n) => n.id, {
    from: { transform: "translate(-50%, 0%)", opacity: 0 },
    leave: { transform: "translate(-50%, 0%)", opacity: 0 },
    enter: { transform: "translate(-50%, -100%)", opacity: 1 },
  });

  useEffect(() => {
    socket.on(SOCKET_EVENT.Error, notify("Danger"));
    socket.on(SOCKET_EVENT.Info, notify("Info"));

    return () => {
      socket.off(SOCKET_EVENT.Error);
      socket.off(SOCKET_EVENT.Info);
    };
  }, []);

  return createPortal(
    <>
      {transitions.map(({ item, props, key }, i, arr) => (
        <animated.div key={key} style={props} css={notificationStyle(COLOR[item.variant], arr.length - i - 1)}>
          {item.message}
        </animated.div>
      ))}
    </>,
    document.getElementById("notification") as HTMLDivElement
  );
};

export default Notifications;
