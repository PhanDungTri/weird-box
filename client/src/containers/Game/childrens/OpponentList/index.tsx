import React from "react";
import { PlayerState } from "../../business/reducers/playerListReducer";
import Opponent from "./Opponent";
import "./OpponentList.scss";

interface OpponentListProps {
  opponents: PlayerState[];
}

const OpponentList = ({ opponents }: OpponentListProps): JSX.Element => {
  return (
    <div className="opponent-list">
      {opponents.map((o) => (
        <Opponent key={o.id} info={o} />
      ))}
    </div>
  );
};

export default OpponentList;
