import { useEffect } from "react";
import { SOCKET_EVENT } from "../../../shared/src/@enums";
import ROUTE from "../constants/ROUTE";
import useAppStateTransition from "../hooks/useAppStateTransition";
import socket from "../services/socket";
import Game from "./Game";
import Hub from "./Hub";
import Test from "./Test";

const pages = {
  [ROUTE.InGame]: <Game />,
  [ROUTE.Hub]: <Hub />,
  [ROUTE.Test]: <Test />,
};

const App = (): JSX.Element => {
  const [appState, setAppState] = useAppStateTransition();

  useEffect(() => {
    socket.once(SOCKET_EVENT.NewGame, () => setAppState(ROUTE.InGame));
  }, []);

  return pages[appState];
};

export default App;
