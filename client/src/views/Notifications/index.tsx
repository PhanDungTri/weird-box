import { createPortal } from "react-dom";
import { animated, useTransition } from "react-spring";
import COLOR from "../../constants/COLOR";
import { useAppState } from "../../hooks/useStore";
import { AppState } from "../../store/app";
import { notificationStyle } from "./styles";

const selectNotifications = (state: AppState) => state.notifications;

const Notifications = (): JSX.Element => {
  const notifications = useAppState(selectNotifications);

  const transitions = useTransition(notifications, (n) => n.id, {
    from: { transform: "translate(-50%, 0%)", opacity: 0 },
    leave: { transform: "translate(-50%, 0%)", opacity: 0 },
    enter: { transform: "translate(-50%, -100%)", opacity: 1 },
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
