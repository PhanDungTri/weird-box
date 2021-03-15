import { useEffect } from "react";
import { SOCKET_EVENT } from "../../../shared/src/@enums";
import APP_STATE from "../constants/APP_STATE";
import useAppStateTransition from "../hooks/useAppStateTransition";
import socket from "../services/socket";
import Game from "./Game";
import Hub from "./Hub";
import Test from "./Test";

const pages = {
  [APP_STATE.InGame]: <Game />,
  [APP_STATE.Hub]: <Hub />,
  [APP_STATE.Test]: <Test />,
};

const App = (): JSX.Element => {
  const [appState, setAppState] = useAppStateTransition();

  useEffect(() => {
    socket.once(SOCKET_EVENT.NewGame, () => setAppState(APP_STATE.InGame));
  }, []);

  return pages[appState];
};

export default App;
