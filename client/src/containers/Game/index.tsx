import React from "react";
import Notification from "../../components/Notification";
import GameBoard from "./GameBoard";
import { GameContextProvider, useGameContext } from "./Game.context";
import "./Game.scss";
import OpponentList from "./OpponentList";
import PlayerHand from "./PlayerHand";
import PlayerStatus from "./PlayerStatus";

const Game = (): JSX.Element => {
  const { chooseCard, maxHP } = useGameContext();

  return (
    <div className="game" onClick={() => chooseCard("")}>
      <OpponentList />
      <GameBoard />
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
