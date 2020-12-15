import React, { useState } from "react";
import HitPointBar from "../../../components/HitPointBar";
import useSocketEvent from "../../../hooks/useSocketEvent";
import "./OpponentList.scss";

interface IPlayer {
  id: string;
  name: string;
}

const OpponentList = (): JSX.Element => {
  const [opponents, setOpponentList] = useState<IPlayer[]>([]);

  const updateOpponentList = (list: IPlayer[]): void => setOpponentList(list);

  useSocketEvent("update opponent list", updateOpponentList);

  return (
    <div className="opponent-list">
      {opponents.map((o) => (
        <div className="opponent-card" key={o.id}>
          <div className="opponent-name">{o.name}</div>
          <div />
          <div />
          <HitPointBar owner={o.id} />
        </div>
      ))}
    </div>
  );
};

export default OpponentList;
