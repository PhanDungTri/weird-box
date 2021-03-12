import { RootState } from "..";
import { put, select } from "redux-saga/effects";
import { hideOldestNotificationAction } from "../reducers/notification/actions";

const getNotificationsLength = (state: RootState) => state.notification.length;

function* requestNotification(action) {
  const { payload } = action;
  const notificationsLength: number = yield select(getNotificationsLength);

  if (notificationsLength >= 3) {
    yield put(hideOldestNotificationAction());
  }

  yield put();
}
