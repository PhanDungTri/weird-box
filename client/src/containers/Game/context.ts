import constate from "constate";
import { useEffect, useState } from "react";
import { SOCKET_EVENT } from "../../../../shared/src/@enums";
import { GameSettings } from "../../../../shared/src/@types";
import socket from "../../services/socket";

const [GameContextProvider, useGameContext] = constate(() => {
  const [{ maxHP, timePerTurn }, setGameSettings] = useState<GameSettings>({ maxHP: 0, timePerTurn: 0 });
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [chosenCard, setChosenCard] = useState("");

  useEffect(() => {
    socket.on(SOCKET_EVENT.StartTurn, (id: string) => setCurrentPlayer(id));
    socket.once(SOCKET_EVENT.GetGameSettings, (settings: GameSettings) => setGameSettings(settings));

    return (): void => {
      socket.off(SOCKET_EVENT.StartTurn);
    };
  }, []);

  const finishTurn = (): void => setCurrentPlayer("");
  const chooseCard = (id: string): void => setChosenCard(id);
  const resetCardChoice = (): void => setChosenCard("");

  return { maxHP, timePerTurn, setGameSettings, currentPlayer, finishTurn, chosenCard, chooseCard, resetCardChoice };
});

export { GameContextProvider, useGameContext };
