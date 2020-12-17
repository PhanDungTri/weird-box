import React from "react";
import HitPointBar from "../../../components/HitPointBar";
import useSocketId from "../../../hooks/useSocketId";
import "./PlayerStatus.scss";

const PlayerStatus = (): JSX.Element => {
  const socketId = useSocketId();

  return (
    <div className="player-status">
      <HitPointBar owner={socketId} />
      <div></div>
    </div>
  );
};

export default PlayerStatus;
