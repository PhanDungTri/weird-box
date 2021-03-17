import ROUTE from "../constants/ROUTE";
import { createSharedStateHook } from "./createSharedStateHook";

const useAppStateTransition = createSharedStateHook(ROUTE.Hub);

export default useAppStateTransition;
