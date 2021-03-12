import { combineReducers } from "redux";
import notificationReducer from "./notification";

const rootReducer = combineReducers({
  notification: notificationReducer,
});

export default rootReducer;
