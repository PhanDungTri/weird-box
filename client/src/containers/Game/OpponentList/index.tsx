import React from "react";
import useSocketId from "../../../hooks/useSocketId";
import { useGameContext } from "../Game.context";
import Opponent from "./Opponent";
import "./OpponentList.scss";

const OpponentList = (): JSX.Element => {
  const socketId = useSocketId();
  const { playerList } = useGameContext();

  return (
    <div className="opponent-list">
      {Object.values(playerList)
        .filter((p) => p.id !== socketId)
        .map((o) => (
          <Opponent key={o.id} {...o} />
        ))}
    </div>
  );
};

export default OpponentList;
