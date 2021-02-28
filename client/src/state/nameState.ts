import { createState, StateMethods, useState } from "@hookstate/core";

const nameState = createState("player");
const useNameState = (): StateMethods<string> => useState(nameState);

export default useNameState;
export { nameState };
