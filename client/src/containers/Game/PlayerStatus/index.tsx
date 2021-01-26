import React from "react";
import { PlayerState } from "..";
import HitPointBar from "../../../components/HitPointBar";
import "./PlayerStatus.scss";

interface PlayerStatusProps {
  info: PlayerState;
  maxHP: number;
}

const PlayerStatus = ({ maxHP, info }: PlayerStatusProps): JSX.Element => {
  return (
    <div className="player-status">
      <HitPointBar maxHP={maxHP} hp={info.hp} />
      <div></div>
    </div>
  );
};

export default PlayerStatus;
