import APP_STATE from "../constants/APP_STATE";
import { createSharedStateHook } from "./createSharedStateHook";

const useAppState = createSharedStateHook(APP_STATE.Hub);

export default useAppState;
