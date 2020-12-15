import React from "react";
import { useRecoilValue } from "recoil";
import HitPointBar from "../../../components/HitPointBar";
import { socketState } from "../../../state";
import "./PlayerStatus.scss";

const PlayerStatus = (): JSX.Element => {
  const socketId = useRecoilValue(socketState).id;

  return (
    <div className="player-status">
      <HitPointBar owner={socketId} />
      <div></div>
    </div>
  );
};

export default PlayerStatus;
