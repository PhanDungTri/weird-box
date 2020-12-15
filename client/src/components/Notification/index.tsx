import React, { useState } from "react";
import { createPortal } from "react-dom";
import useSocketEvent from "../../hooks/useSocketEvent";
import "./Notification.scss";

enum NOTI_VARIANT {
  Error = "error",
  Warning = "warning",
  Info = "info",
  Success = "success",
}

const Notification = (): JSX.Element => {
  const [isShown, setIsShown] = useState(false);
  const [variant, setVariant] = useState<NOTI_VARIANT>(NOTI_VARIANT.Info);
  const [message, setMessage] = useState("");

  const show = (variant: NOTI_VARIANT) => (message: string) => {
    setIsShown(true);
    setMessage(message);
    setVariant(variant);

    setTimeout(() => setIsShown(false), 2000);
  };

  useSocketEvent("error", show(NOTI_VARIANT.Error));
  useSocketEvent("info", show(NOTI_VARIANT.Info));

  return createPortal(
    <div className={`notification ${variant} ${isShown ? "" : "hide"}`}>{message}</div>,
    document.getElementById("notification") as HTMLElement
  );
};

export default Notification;
