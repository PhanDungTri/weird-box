import { useEffect, useState } from "react";
import { SOCKET_EVENT } from "../../../../../shared/src/@enums";
import { PlayerInfo } from "../../../@types";
import socket from "../../../services/socket";
import { gridStyle } from "../../../styles";
import EmptySlot from "./EmptySlot";
import Opponent from "./Opponent";
import { opponentsStyle } from "./styles";

const Opponents = (): JSX.Element => {
  const [opponents, setOpponents] = useState<Array<PlayerInfo | null>>([]);

  useEffect(() => {
    socket.on(SOCKET_EVENT.PlayerEliminated, (id: string) => setOpponents((list) => list.filter((o) => o?.id !== id)));

    socket.once(SOCKET_EVENT.GetPlayerList, (players: PlayerInfo[]) => {
      const opponents: Array<PlayerInfo | null> = players.filter((p) => p.id !== socket.id);

      for (let i = 0; i < 3; i++) {
        if (!opponents[i]) opponents[i] = null;
      }

      setOpponents(opponents);
    });

    return () => void socket.off(SOCKET_EVENT.PlayerEliminated);
  }, []);

  return (
    <div css={[gridStyle, opponentsStyle]}>
      {opponents.map((o, i) => (o ? <Opponent {...o} key={o.id} /> : <EmptySlot key={i} />))}
    </div>
  );
};

export default Opponents;
