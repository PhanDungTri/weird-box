import React, { useEffect, useState } from "react";
import { SOCKET_EVENT } from "../../../../../shared/src/@enums";
import Status from "../Status";
import socket from "../../../services/socket";
import Hand from "./Hand";

const Player = (): JSX.Element => {
  const [isEliminated, shouldBeEliminated] = useState(false);

  useEffect(() => {
    socket.on(SOCKET_EVENT.PlayerEliminated, (id: string) => {
      if (id === socket.id) shouldBeEliminated(true);
    });

    return () => void socket.off(SOCKET_EVENT.PlayerEliminated);
  }, []);

  return (
    <div className="player">
      <Status id={socket.id} horizontal />
      <Hand eliminated={isEliminated} />
    </div>
  );
};

export default Player;
