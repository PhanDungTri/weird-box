import React, { useEffect, useState } from "react";
import { SOCKET_EVENT } from "../../../../../shared/src/@enums";
import { PlayerInfo } from "../../../@types";
import socket from "../../../services/socket";
import Opponent from "./Opponent";
import "./Opponents.scss";

const Opponents = (): JSX.Element => {
  const [opponents, setOpponents] = useState<Record<string, PlayerInfo>>({});

  useEffect(() => {
    socket.on(SOCKET_EVENT.PlayerEliminated, (id: string) =>
      setOpponents((list) => (list[id] ? { ...list, [id]: { ...list[id], isEliminated: true } } : list))
    );

    socket.once(SOCKET_EVENT.GetPlayerList, (players: PlayerInfo[]) => {
      const result: typeof opponents = {};
      for (const p of players) if (p.id !== socket.id) result[p.id] = p;
      setOpponents(result);
    });

    return () => void socket.off(SOCKET_EVENT.PlayerEliminated);
  }, []);

  return (
    <div className="opponents">
      {Object.values(opponents).map((o) => (
        <Opponent {...o} key={o.id} />
      ))}
    </div>
  );
};

export default Opponents;
