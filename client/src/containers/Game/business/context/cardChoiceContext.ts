import { useState } from "react";

interface CardChoiceHook {
  chosenCard: string;
  chooseCard: (id: string) => void;
  clearCardChoice: () => void;
}

const useCardChoice = (): CardChoiceHook => {
  const [chosenCard, setChosenCard] = useState("");
  const chooseCard = (id: string): void => setChosenCard(id);
  const clearCardChoice = (): void => setChosenCard("");

  return { chosenCard, chooseCard, clearCardChoice };
};

export default useCardChoice;
