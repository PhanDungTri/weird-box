import React from "react";
import { IPlayer } from "../../../../../shared/src/interfaces/Player";
import socket from "../../../global/socket";
import { usePlayerListState } from "../state";
import Opponent from "./Opponent";
import "./OpponentList.scss";

const OpponentList = (): JSX.Element => {
  const { id } = socket;
  const players = usePlayerListState() as IPlayer[];

  return (
    <div className="opponent-list">
      {players
        .filter((p) => p.id !== id)
        .map((o) => (
          <Opponent key={o.id} {...o} />
        ))}
    </div>
  );
};

export default OpponentList;
