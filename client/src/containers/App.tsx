import { useEffect } from "react";
import { SOCKET_EVENT } from "../../../shared/src/@enums";
import APP_STATE from "../constants/APP_STATE";
import socket from "../services/socket";
import useAppState from "../state/appState";
import Game from "./Game";
import Hub from "./Hub";
import Notifications from "./Notifications";
import Test from "./Test";

const pages = {
  [APP_STATE.InGame]: <Game />,
  [APP_STATE.Hub]: <Hub />,
  [APP_STATE.Test]: <Test />,
};

const App = (): JSX.Element => {
  const [appState, setAppState] = useAppState();

  useEffect(() => {
    socket.on(SOCKET_EVENT.GameFound, () => setAppState(APP_STATE.InGame));

    return () => void socket.off(SOCKET_EVENT.GameFound);
  });

  return (
    <>
      {pages[appState]}
      <Notifications />
    </>
  );
};

export default App;
