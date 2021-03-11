import generateUniqueId from "../../../shared/src/utils/generateUniqueId";
import { NotificationProps, StyleVariant } from "../../src/@types";

enum NOTIFICATION_ACTION {
  Notify = "notify",
  HideNotification = "hide notification",
}

type NotifyAction = {
  type: NOTIFICATION_ACTION;
  payload: NotificationProps;
};

type HideNotificationAction = {
  type: NOTIFICATION_ACTION;
  payload: string;
};

type NotificationActionType = NotifyAction;

const notifyAction = (message: string, variant: StyleVariant = "Info"): NotifyAction => ({
  type: NOTIFICATION_ACTION.Notify,
  payload: {
    id: generateUniqueId(),
    message,
    variant,
  },
});

const hideNotificationAction = (id: string): HideNotificationAction => ({
  type: NOTIFICATION_ACTION.HideNotification,
  payload: id,
});

const addNotification = (state: NotificationProps[], notification: NotificationProps): NotificationProps[] => [
  ...state,
  notification,
];

const removeNotification = (state: NotificationProps[], id: string): NotificationProps[] =>
  state.filter((n) => n.id !== id);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handlers: Record<NOTIFICATION_ACTION, (state: NotificationProps[], value: any) => NotificationProps[]> = {
  [NOTIFICATION_ACTION.Notify]: addNotification,
  [NOTIFICATION_ACTION.HideNotification]: removeNotification,
};

const notificationReducer = (state: NotificationProps[], action: NotificationActionType): NotificationProps[] => {
  const handler = handlers[action.type];
  if (handler) return handler(state, action.payload);
  return state;
};

export default notificationReducer;
