import { EventChannel, eventChannel } from "@redux-saga/core";
import { call, delay, put, select, take, takeEvery } from "redux-saga/effects";
import { Socket } from "socket.io-client";
import { RootState } from "..";
import { SOCKET_EVENT } from "../../../../shared/src/@enums";
import generateUniqueId from "../../../../shared/src/utils/generateUniqueId";
import { NotificationPayload } from "../../@types";
import socket from "../../services/socket";
import {
  hideNotificationAction,
  hideOldestNotificationAction,
  NOTIFICATION_REQUEST_ACTION,
  notifyAction,
  requestNotifyAction,
  RequestNotifyAction,
} from "../actions";

const getNotificationsLength = (state: RootState) => state.notification.length;

const createNotificationSocketChannel = (socket: Socket) =>
  eventChannel<NotificationPayload>((emit) => {
    socket.on(SOCKET_EVENT.Info, (message: string) => emit({ message, variant: "Info" }));
    socket.on(SOCKET_EVENT.Error, (message: string) => emit({ message, variant: "Danger" }));

    return () => {
      socket.off(SOCKET_EVENT.Info);
      socket.off(SOCKET_EVENT.Error);
    };
  });

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function* watchNotificationSocket() {
  const notificationChannel: EventChannel<NotificationPayload> = yield call(createNotificationSocketChannel, socket);

  while (true) {
    const payload: NotificationPayload = yield take(notificationChannel);
    yield put(requestNotifyAction(payload));
  }
}

function* requestNotification(action: RequestNotifyAction) {
  const { message, variant } = action.payload;
  const id = generateUniqueId();
  const notificationsLength: number = yield select(getNotificationsLength);

  if (notificationsLength >= 3) {
    yield put(hideOldestNotificationAction());
  }

  yield put(notifyAction({ id, message, variant }));
  yield delay(2000);
  yield put(hideNotificationAction(id));
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function* watchNotification() {
  yield takeEvery(NOTIFICATION_REQUEST_ACTION.RequestNotify, requestNotification);
}
