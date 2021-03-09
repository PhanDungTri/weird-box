import { css } from "@emotion/react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { SOCKET_EVENT } from "../../../../shared/src/@enums";
import { StyleVariant } from "../../@types";
import COLOR from "../../constants/COLOR";
import socket from "../../services/socket";
import useNotificationState from "../../state/notificationState";
import { notificationStyle } from "./style";

const Notification = (): JSX.Element => {
  const state = useNotificationState();
  const { show, variant, message } = state.value;

  const showNotification = (variant: StyleVariant) => (message: string) => {
    state.set({ variant, message, show: true });
  };

  useEffect(() => {
    if (show && message) setTimeout(() => state.show.set(false), 2000);
  }, [show]);

  useEffect(() => {
    socket.on(SOCKET_EVENT.Error, showNotification("Danger"));
    socket.on(SOCKET_EVENT.Info, showNotification("Info"));

    return () => {
      socket.off(SOCKET_EVENT.Error);
      socket.off(SOCKET_EVENT.Info);
    };
  }, []);

  return createPortal(
    <div
      css={[
        notificationStyle(COLOR[variant]),
        show &&
          css`
            transform: translate(-50%, -100%);
            z-index: 1;
          `,
      ]}
    >
      {message}
    </div>,
    document.getElementById("notification") as HTMLElement
  );
};

export default Notification;
