import { useAtom } from "jotai";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { animated, useTransition } from "react-spring";
import { SERVER_EVENT_NAME } from "../../../shared/constants";
import { notificationsAtom } from "../../atoms";
import { COLOR } from "../../constants";
import { useNotify } from "../../hooks/useNotify";
import socket from "../../services/socket";
import { notificationStyle } from "./styles";

const Notifications = (): JSX.Element => {
  const [notifications] = useAtom(notificationsAtom);
  const notify = useNotify();

  const transitions = useTransition(notifications, (n) => n.id, {
    from: { transform: "translate(-50%, 0%)", opacity: 0 },
    leave: { transform: "translate(-50%, 0%)", opacity: 0 },
    enter: { transform: "translate(-50%, -100%)", opacity: 1 },
  });

  useEffect(() => {
    socket.on(SERVER_EVENT_NAME.Notify, notify);

    return () => void socket.off(SERVER_EVENT_NAME.Notify, notify);
  }, [notify]);

  return createPortal(
    transitions.map(({ item, props, key }, i, arr) => (
      <animated.div key={key} style={props} css={notificationStyle(COLOR[item.variant], arr.length - i - 1)}>
        {item.message}
      </animated.div>
    )),
    document.getElementById("notification") as HTMLDivElement
  );
};

export default Notifications;
