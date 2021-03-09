import { createState, State, useState } from "@hookstate/core";
import { StyleVariant } from "../@types";

type NotificationState = {
  variant: StyleVariant;
  message: string;
  show: boolean;
};

const notificationState = createState<NotificationState>({
  variant: "Info",
  message: "",
  show: false,
});

const useNotificationState = (): State<NotificationState> => useState(notificationState);

export default useNotificationState;
