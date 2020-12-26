import React, { useState } from "react";
import useSocketEvent from "../../../hooks/useSocketEvent";
import "./OpponentList.scss";
import IPlayer from "../../../interfaces/IPlayer";
import Opponent from "./Opponent";

const OpponentList = (): JSX.Element => {
  const [opponents, setOpponentList] = useState<IPlayer[]>([]);

  const updateOpponentList = (list: IPlayer[]): void => setOpponentList(list);

  useSocketEvent("update opponent list", updateOpponentList);

  return (
    <div className="opponent-list">
      {opponents.map((o) => (
        <Opponent key={o.id} {...o} />
      ))}
    </div>
  );
};

export default OpponentList;
