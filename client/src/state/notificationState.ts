import { atom } from "recoil";
import NOTI_VARIANT from "../constants/NOTI_VARIANT";

interface NotificationState {
  variant: NOTI_VARIANT;
  message: string;
  show: boolean;
}

const notificationState = atom<NotificationState>({
  key: "notificationState",
  default: {
    variant: NOTI_VARIANT.Info,
    message: "",
    show: false,
  },
});

export default notificationState;
