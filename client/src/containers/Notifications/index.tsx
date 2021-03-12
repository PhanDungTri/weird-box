import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { Transition, TransitionGroup } from "react-transition-group";
import { RootState } from "../../store";
import Notification from "./Notification";
import { notificationTransition } from "./styles";

const Notifications = (): JSX.Element => {
  const notifications = useSelector((state: RootState) => state.notification);

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
