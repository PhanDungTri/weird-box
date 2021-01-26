import { createState, StateMethods, useState } from "@hookstate/core";
import SOCKET_EVENT from "../../../shared/src/SocketEvent";
import socket from "../global/socket";

enum APP_STATE {
  Hub,
  InGame,
}

const appState = createState<APP_STATE>(APP_STATE.Hub);
const useAppState = (): StateMethods<APP_STATE> => useState(appState);

socket.on(SOCKET_EVENT.GetGameInfo, () => appState.set(APP_STATE.InGame));

export default useAppState;
export { APP_STATE, appState };
