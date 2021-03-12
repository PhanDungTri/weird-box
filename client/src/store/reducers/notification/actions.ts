import generateUniqueId from "../../../../../shared/src/utils/generateUniqueId";
import { NotificationProps, StyleVariant } from "../../../@types";

export enum NOTIFICATION_ACTION {
  Notify = "notify",
  HideNotification = "hide notification",
  HideOldestNotification = "hide oldest notification",
}

type NotifyAction = {
  type: NOTIFICATION_ACTION;
  payload: NotificationProps;
};

type HideNotificationAction = {
  type: NOTIFICATION_ACTION;
  payload: string;
};

type HideOldestNotificationAction = {
  type: NOTIFICATION_ACTION;
  payload: undefined;
};

export type NotificationActionType = NotifyAction | HideNotificationAction | HideOldestNotificationAction;

export const notifyAction = (message: string, variant: StyleVariant = "Info"): NotifyAction => ({
  type: NOTIFICATION_ACTION.Notify,
  payload: {
    id: generateUniqueId(),
    message,
    variant,
  },
});

export const hideNotificationAction = (id: string): HideNotificationAction => ({
  type: NOTIFICATION_ACTION.HideNotification,
  payload: id,
});

export const hideOldestNotificationAction = (): HideOldestNotificationAction => ({
  type: NOTIFICATION_ACTION.HideOldestNotification,
  payload: undefined,
});
