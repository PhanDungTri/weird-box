import React from "react";
import useAppState, { APP_STATE } from "../state/appState";
import Game from "./Game";
import Hub from "./Hub";

const App = (): JSX.Element => {
  const appState = useAppState().value;

  return ((): JSX.Element => {
    switch (appState) {
      case APP_STATE.InGame:
        return <Game />;
      default:
        return <Hub />;
    }
  })();
};

export default App;
