import { createSharedStateHook } from "./createSharedStateHook";

const usePlayerName = createSharedStateHook("player");

export default usePlayerName;
