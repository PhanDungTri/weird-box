import React from "react";
import HitPointBar from "../../../components/HitPointBar";
import useSocketId from "../../../hooks/useSocketId";
import { useGameContext } from "../Game.context";
import "./PlayerStatus.scss";

const PlayerStatus = (): JSX.Element => {
  const socketId = useSocketId();
  const { maxHP, getPlayerById } = useGameContext();
  const player = getPlayerById(socketId);

  return (
    <div className="player-status">
      <HitPointBar maxHP={maxHP} hp={player?.hp || 0} />
      <div></div>
    </div>
  );
};

export default PlayerStatus;
