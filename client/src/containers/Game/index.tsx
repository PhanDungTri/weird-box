import React from "react";
import Notification from "../../components/Notification";
import "./Game.scss";
import GameBoard from "./GameBoard";
import OpponentList from "./OpponentList";
import PlayerHand from "./PlayerHand";
import PlayerStatus from "./PlayerStatus";
import { useChosenCardState } from "./state";

const Game = (): JSX.Element => {
  const { unchooseCard } = useChosenCardState();

  return (
    <div className="game" onClick={unchooseCard}>
      <OpponentList />
      <GameBoard />
      <PlayerStatus />
      <PlayerHand />
      <Notification />
    </div>
  );
};

export default Game;
