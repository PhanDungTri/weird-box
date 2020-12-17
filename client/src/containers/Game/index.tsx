import React from "react";
import Notification from "../../components/Notification";
import { GameContextProvider, useGameContext } from "./Game.context";
import PlayerHand from "./PlayerHand";
import BoxOfCard from "./BoxOfCard";
import PlayerStatus from "./PlayerStatus";
import OpponentList from "./OpponentList";
import useSocketEvent from "../../hooks/useSocketEvent";
import "./Game.scss";

interface GameInfoRes {
  maxHP: number;
}

const Game = (): JSX.Element => {
  const { chooseCard, setMaxHP, maxHP } = useGameContext();

  useSocketEvent("get game info", ({ maxHP }: GameInfoRes) => {
    setMaxHP(maxHP);
  });

  return (
    <div className="game" onClick={() => chooseCard("")}>
      <OpponentList />
      <BoxOfCard />
      {maxHP > 0 && <PlayerStatus />}
      <PlayerHand />
      <Notification />
    </div>
  );
};

const GameContext = (): JSX.Element => {
  return (
    <GameContextProvider>
      <Game />
    </GameContextProvider>
  );
};

export default GameContext;
