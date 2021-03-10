import useAppState, { APP_STATE } from "../state/appState";
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
  const appState = useAppState().value;

  return (
    <>
      {pages[appState]}
      <Notifications />
    </>
  );
};

export default App;
