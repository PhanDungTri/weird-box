import { useEffect } from "react";
import { createPortal } from "react-dom";
import NOTI_VARIANT from "../../constants/NOTI_VARIANT";
import socket from "../../services/socket";
import useNotificationState from "../../state/notificationState";
import "./Notification.scss";

const Notification = (): JSX.Element => {
  const state = useNotificationState();
  const { show, variant, message } = state.value;

  const showNotification = (variant: NOTI_VARIANT) => (message: string) => {
    state.set({ variant, message, show: true });
  };

  useEffect(() => {
    if (show && message) {
      setTimeout(() => state.show.set(false), 2000);
    }
  }, [show]);

  useEffect(() => {
    socket.on("error", showNotification(NOTI_VARIANT.Error));
    socket.on("info", showNotification(NOTI_VARIANT.Info));

    return (): void => {
      socket.off("error");
      socket.off("info");
    };
  }, []);

  return createPortal(
    <div className={`notification -${variant} ${show ? "" : "-hide"}`}>{message}</div>,
    document.getElementById("notification") as HTMLElement
  );
};

export default Notification;
