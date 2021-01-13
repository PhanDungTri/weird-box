import { createState, StateMethods, useState } from "@hookstate/core";

enum APP_STATE {
  Hub,
  InGame,
}

const appState = createState<APP_STATE>(APP_STATE.Hub);
const useAppState = (): StateMethods<APP_STATE> => useState(appState);

export default useAppState;
export { APP_STATE, appState };
