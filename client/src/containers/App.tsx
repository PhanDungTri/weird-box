import React from "react";
import { RecoilRoot } from "recoil";
import GameContext from "./Game";

const App = (): JSX.Element => {
  return (
    <RecoilRoot>
      <GameContext />
    </RecoilRoot>
  );
};

export default App;
