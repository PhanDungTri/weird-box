import "normalize.css";
import ReactDOM from "react-dom";
import App from "./containers/App";
import Notifications from "./containers/Notifications";
import "./index.css";

ReactDOM.render(
  <>
    <App />
    <Notifications />
  </>,
  document.getElementById("app")
);
