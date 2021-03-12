import "normalize.css";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./containers/App";
import "./index.css";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
