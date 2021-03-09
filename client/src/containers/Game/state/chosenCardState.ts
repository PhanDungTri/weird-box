import { createState, useState } from "@hookstate/core";

interface ChosenCardStateHook {
  chosenCard: string;
  chooseCard: (id: string) => void;
  unchooseCard: () => void;
}

const chosenCardState = createState("");

const useChosenCardState = (): ChosenCardStateHook => {
  const state = useState(chosenCardState);
  const chooseCard = (id: string): void => state.set(id);
  const unchooseCard = (): void => state.set("");

  return {
    chosenCard: state.value,
    chooseCard,
    unchooseCard,
  };
};

export { useChosenCardState };
