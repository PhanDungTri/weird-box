import { useAtom } from "jotai";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { animated, useTransition } from "react-spring";
import { StyleVariation } from "../../../shared/@types";
import { SERVER_EVENT_NAME } from "../../../shared/constants";
import { languageAtom, notificationsAtom } from "../../atoms";
import { useNotify } from "../../hooks/useNotify";
import socket from "../../services/socket";
import { notificationStyle } from "./styles";

const Notifications = (): JSX.Element => {
  const [notifications] = useAtom(notificationsAtom);
  const [language] = useAtom(languageAtom);
  const notify = useNotify();

  const transitions = useTransition(notifications, (n) => n.id, {
    from: { transform: "translate(-50%, 0%)", opacity: 0 },
    leave: { transform: "translate(-50%, 0%)", opacity: 0 },
    enter: { transform: "translate(-50%, -100%)", opacity: 1 },
  });

  useEffect(() => {
    const onNotify = (message: string, variation: StyleVariation) => notify(language[message], variation);

    socket.on(SERVER_EVENT_NAME.Notify, onNotify);

    return () => void socket.off(SERVER_EVENT_NAME.Notify, onNotify);
  }, [notify]);

  return createPortal(
    transitions.map(({ item, props, key }, i, arr) => (
      <animated.div key={key} style={props} css={notificationStyle(item.variation, arr.length - i - 1)}>
        {item.message}
      </animated.div>
    )),
    document.getElementById("notification") as HTMLDivElement
  );
};

export default Notifications;
