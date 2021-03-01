import useAppState, { APP_STATE } from "../state/appState";
import Game from "./Game";
import Hub from "./Hub";
import Test from "./Test";

const App = (): JSX.Element => {
  const appState = useAppState().value;

  return ((): JSX.Element => {
    switch (appState) {
      case APP_STATE.InGame:
        return <Game />;
      case APP_STATE.Test:
        return <Test />;
      default:
        return <Hub />;
    }
  })();
};

export default App;
