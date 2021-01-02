import constate from "constate";
import { useRef, useState } from "react";
import SOCKET_EVENT from "../../../../shared/src/socketEvent";
import useSocketEvent from "../../hooks/useSocketEvent";
import IPlayer from "../../interfaces/IPlayer";

interface GameContext {
  maxHP: number;
  chosenCard: string;
  players: IPlayer[];
  currentPlayer: string;
  chooseCard: (id: string) => void;
  getPlayerById: (id: string) => IPlayer;
}

interface GameInfo {
  maxHP: number;
}

const context = (): GameContext => {
  const [chosenCard, setChosenCard] = useState("");
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState("");
  const maxHP = useRef<number>(0);

  const chooseCard = (id: string): void => setChosenCard(id);

  const getPlayerById = (id: string): IPlayer => {
    const player = players.find((p) => p.id === id);
    if (!player) throw new Error("Invalid player id");
    return player;
  };

  useSocketEvent(SOCKET_EVENT.GetGameInfo, (data: GameInfo) => (maxHP.current = data.maxHP));
  useSocketEvent(SOCKET_EVENT.GetPlayerList, (data: IPlayer[]) => setPlayers(data));
  useSocketEvent(SOCKET_EVENT.StartTurn, (id: string) => setCurrentPlayer(id));

  return { chosenCard, chooseCard, maxHP: maxHP.current, currentPlayer, players, getPlayerById };
};

const [GameContextProvider, useGameContext] = constate(context);

export { GameContextProvider, useGameContext };
