import { Reducer } from "redux";
import { NotificationProps } from "../../@types";
import { NOTIFICATION_ACTION, NotificationActionType } from "../actions";

const addNotification = (state: NotificationProps[], notification: NotificationProps): NotificationProps[] => [
  ...state,
  notification,
];

const removeNotification = (state: NotificationProps[], id: string): NotificationProps[] =>
  state.filter((n) => n.id !== id);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const removeOldestNotification = (state: NotificationProps[], _: undefined): NotificationProps[] => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [first, ...remains] = state;
  return remains;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handlers: Record<NOTIFICATION_ACTION, (state: NotificationProps[], value: any) => NotificationProps[]> = {
  [NOTIFICATION_ACTION.Notify]: addNotification,
  [NOTIFICATION_ACTION.HideNotification]: removeNotification,
  [NOTIFICATION_ACTION.HideOldestNotification]: removeOldestNotification,
};

const notificationReducer: Reducer<NotificationProps[], NotificationActionType> = (state = [], action) => {
  const handler = handlers[action.type];
  if (handler) return handler(state, action.payload);
  return state;
};

export default notificationReducer;
