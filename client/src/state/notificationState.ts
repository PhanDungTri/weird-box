import { createState, State, useState } from "@hookstate/core";
import NOTI_VARIANT from "../constants/NOTI_VARIANT";

type NotificationState = {
  variant: NOTI_VARIANT;
  message: string;
  show: boolean;
};

const notificationState = createState<NotificationState>({
  variant: NOTI_VARIANT.Info,
  message: "",
  show: false,
});

const useNotificationState = (): State<NotificationState> => useState(notificationState);

export default useNotificationState;
