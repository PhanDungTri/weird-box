import APP_STATE from "../constants/APP_STATE";
import { createSharedStateHook } from "./createSharedStateHook";

const useAppStateTransition = createSharedStateHook(APP_STATE.Hub);

export default useAppStateTransition;
