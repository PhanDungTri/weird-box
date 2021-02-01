import React from "react";
import HitPointBar from "../../../components/HitPointBar";
import "./PlayerStatus.scss";

interface PlayerStatusProps {
  hp?: number;
  maxHP: number;
}

const PlayerStatus = ({ maxHP, hp = 0 }: PlayerStatusProps): JSX.Element => {
  return (
    <div className="player__status">
      <HitPointBar maxHP={maxHP} hp={hp} />
      <div></div>
    </div>
  );
};

export default PlayerStatus;
