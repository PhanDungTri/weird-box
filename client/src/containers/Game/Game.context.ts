import constate from "constate";
import { useState } from "react";

interface GameContextHook {
  maxHP: number;
  chosenCard: string;
  chooseCard: (id: string) => void;
  setMaxHP: (maxHP: number) => void;
}

const gameContext = (): GameContextHook => {
  const [chosenCard, setChosenCard] = useState("");
  const [maxHP, setMaxHP] = useState(0);
  const chooseCard = (id: string) => setChosenCard(id);

  return { chosenCard, chooseCard, maxHP, setMaxHP };
};

const [GameContextProvider, useGameContext] = constate(gameContext);

export { GameContextProvider, useGameContext };
