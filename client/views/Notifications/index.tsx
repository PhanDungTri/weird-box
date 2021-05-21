import { useAtom } from "jotai";
import { createPortal } from "react-dom";
import { animated, useTransition } from "react-spring";
import { NotificationVariant } from "../../../shared/@types";
import { SERVER_EVENT_NAME } from "../../../shared/constants";
import { notificationsAtom } from "../../atoms";
import { COLOR } from "../../constants";
import { useListenServerEvent } from "../../hooks";
import { notificationStyle } from "./styles";
import SafeSound from "../../assets/sounds/noti_safe.mp3";
import DangerSound from "../../assets/sounds/noti_danger.mp3";
import WarningSound from "../../assets/sounds/noti_warn.mp3";
import InfoSound from "../../assets/sounds/noti_info.mp3";
import { useState } from "react";
import { Howl } from "howler";

const Notifications = (): JSX.Element => {
  const [notifications, notify] = useAtom(notificationsAtom);
  const [sound] = useState({
    Safe: new Howl({ src: [SafeSound] }),
    Danger: new Howl({ src: [DangerSound] }),
    Warning: new Howl({ src: [WarningSound] }),
    Info: new Howl({ src: [InfoSound] }),
    Primary: null,
  });

  const transitions = useTransition(notifications, (n) => n.id, {
    from: { transform: "translate(-50%, 0%)", opacity: 0 },
    leave: { transform: "translate(-50%, 0%)", opacity: 0 },
    enter: { transform: "translate(-50%, -100%)", opacity: 1 },
  });

  useListenServerEvent(SERVER_EVENT_NAME.Notify, (message: string, variant: NotificationVariant) => {
    sound[variant]?.play();
    notify({ message, variant });
  });

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
