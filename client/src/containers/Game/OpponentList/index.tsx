import React from "react";
import { PlayerState } from "../playerListReducer";
import Opponent from "./Opponent";
import "./OpponentList.scss";

interface OpponentListProps {
  opponents: PlayerState[];
  maxHP: number;
}

const OpponentList = ({ opponents, maxHP }: OpponentListProps): JSX.Element => {
  return (
    <div className="opponent-list">
      {opponents.map((o) => (
        <Opponent key={o.id} maxHP={maxHP} info={o} />
      ))}
    </div>
  );
};

export default OpponentList;
