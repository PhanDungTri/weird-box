import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import NOTI_VARIANT from "../../constants/NOTI_VARIANT";
import useSocketEvent from "../../hooks/useSocketEvent";
import notificationState from "../../state/notificationState";
import "./Notification.scss";

const Notification = (): JSX.Element => {
  const { variant, message, show } = useRecoilValue(notificationState);
  const setNotification = useSetRecoilState(notificationState);

  const showNotification = (variant: NOTI_VARIANT) => (message: string) => {
    setNotification({ variant, message, show: true });
  };

  useEffect(() => {
    if (show && message) {
      setTimeout(() => setNotification((state) => ({ ...state, show: false })), 2000);
    }
  }, [show]);

  useSocketEvent("error", showNotification(NOTI_VARIANT.Error));
  useSocketEvent("info", showNotification(NOTI_VARIANT.Info));

  return createPortal(
    <div className={`notification ${variant} ${show ? "" : "hide"}`}>{message}</div>,
    document.getElementById("notification") as HTMLElement
  );
};

export default Notification;
