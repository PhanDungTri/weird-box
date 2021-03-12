import { NotificationPayload, NotificationProps, StyleVariant } from "../../@types";

export enum NOTIFICATION_ACTION {
  Notify = "notify",
  HideNotification = "hide notification",
  HideOldestNotification = "hide oldest notification",
}

export enum NOTIFICATION_REQUEST_ACTION {
  RequestNotify = "request notify",
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

export type RequestNotifyAction = {
  type: NOTIFICATION_REQUEST_ACTION;
  payload: {
    message: string;
    variant: StyleVariant;
  };
};

export type NotificationActionType = NotifyAction | HideNotificationAction | HideOldestNotificationAction;

export const requestNotifyAction = ({ message, variant }: NotificationPayload): RequestNotifyAction => ({
  type: NOTIFICATION_REQUEST_ACTION.RequestNotify,
  payload: { message, variant },
});

export const notifyAction = (notification: NotificationProps): NotifyAction => ({
  type: NOTIFICATION_ACTION.Notify,
  payload: notification,
});

export const hideNotificationAction = (id: string): HideNotificationAction => ({
  type: NOTIFICATION_ACTION.HideNotification,
  payload: id,
});

export const hideOldestNotificationAction = (): HideOldestNotificationAction => ({
  type: NOTIFICATION_ACTION.HideOldestNotification,
  payload: undefined,
});
