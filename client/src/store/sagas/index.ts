import { all } from "@redux-saga/core/effects";
import { watchNotification, watchNotificationSocket } from "./notification";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function* rootSaga() {
  yield all([watchNotification(), watchNotificationSocket()]);
}

export default rootSaga;
