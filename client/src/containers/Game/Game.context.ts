import constate from "constate";
import { useState } from "react";
import SOCKET_EVENT from "../../../../shared/src/socketEvent";
import useSocketEvent from "../../hooks/useSocketEvent";

interface GameContext {
  maxHP: number;
  chosenCard: string;
  currentPlayer: string;
  chooseCard: (id: string) => void;
  setMaxHP: (maxHP: number) => void;
}

interface GameInfo {
  maxHP: number;
}

const context = (): GameContext => {
  const [chosenCard, setChosenCard] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [maxHP, setMaxHP] = useState(0);
  const chooseCard = (id: string) => setChosenCard(id);

  useSocketEvent(SOCKET_EVENT.GetGameInfo, ({ maxHP }: GameInfo) => {
    setMaxHP(maxHP);
  });

  useSocketEvent(SOCKET_EVENT.StartTurn, (id: string) => setCurrentPlayer(id));

  return { chosenCard, chooseCard, maxHP, setMaxHP, currentPlayer };
};

const [GameContextProvider, useGameContext] = constate(context);

export { GameContextProvider, useGameContext };
