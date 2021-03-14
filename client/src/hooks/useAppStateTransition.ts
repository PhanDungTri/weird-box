import { SOCKET_EVENT } from "../../../shared/src/@enums";
import APP_STATE from "../constants/APP_STATE";
import socket from "../services/socket";
import { createSharedStateHook } from "./createSharedStateHook";

const useAppStateTransition = createSharedStateHook(APP_STATE.Hub, (setter) => {
  socket.on(SOCKET_EVENT.GameFound, () => setter(APP_STATE.InGame));
  return () => void socket.off(SOCKET_EVENT.GameFound);
});

export default useAppStateTransition;
