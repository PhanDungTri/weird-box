import { createSharedStateHook } from "./createSharedStateHook";

const useNameState = createSharedStateHook("player");

export default useNameState;
