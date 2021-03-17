import "normalize.css";
import ReactDOM from "react-dom";
import App from "./views/App";
import Notifications from "./views/Notifications";
import "./index.css";

ReactDOM.render(
  <>
    <App />
    <Notifications />
  </>,
  document.getElementById("app")
);
