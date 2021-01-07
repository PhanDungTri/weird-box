import { createState, useState } from "@hookstate/core";

const currentPlayerState = createState("");
const useCurrentPlayerState = (): string => useState(currentPlayerState).value;

export { currentPlayerState, useCurrentPlayerState };
