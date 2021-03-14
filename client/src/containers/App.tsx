import APP_STATE from "../constants/APP_STATE";
import useAppStateTransition from "../hooks/useAppStateTransition";
import Game from "./Game";
import Hub from "./Hub";
import Test from "./Test";

const pages = {
  [APP_STATE.InGame]: <Game />,
  [APP_STATE.Hub]: <Hub />,
  [APP_STATE.Test]: <Test />,
};

const App = (): JSX.Element => {
  const [appState] = useAppStateTransition();

  return pages[appState];
};

export default App;
