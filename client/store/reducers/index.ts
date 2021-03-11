import { combineReducers } from "redux";
import notificationReducer from "./notificationReducer";

const rootReducer = combineReducers({
  notification: notificationReducer,
});

export default rootReducer;
