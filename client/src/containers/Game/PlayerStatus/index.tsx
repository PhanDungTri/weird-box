import React from "react";
import { IPlayer } from "../../../../../shared/src/interfaces/Player";
import HitPointBar from "../../../components/HitPointBar";
import socket from "../../../global/socket";
import { useGameState, usePlayerListState } from "../state";
import "./PlayerStatus.scss";

const PlayerStatus = (): JSX.Element => {
  const { id } = socket;
  const { maxHP } = useGameState();
  const player = usePlayerListState(id) as IPlayer;

  return (
    <div className="player-status">
      <HitPointBar maxHP={maxHP} hp={player.hp} />
      <div></div>
    </div>
  );
};

export default PlayerStatus;
