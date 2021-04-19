import { Howler } from "howler";
import { enableES5 } from "immer";
import "normalize.css";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./views/App";
import Notifications from "./views/Notifications";

enableES5();
Howler.volume(0.5);

ReactDOM.render(
  <>
    <App />
    <Notifications />
  </>,
  document.getElementById("app")
);
