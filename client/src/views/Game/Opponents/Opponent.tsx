import { useEffect, useState } from "react";
import { SOCKET_EVENT } from "../../../../../shared/src/@enums";
import { PlayerInfo } from "../../../@types";
import socket from "../../../services/socket";
import { disabledStyle } from "../../../styles";
import SpellAnimation from "../SpellAnimation";
import Status from "../Status";
import { opponentNameStyle, opponentStyle } from "./styles";

const Opponent = ({ id, name }: PlayerInfo): JSX.Element => {
  const [isEliminated, shouldBeEliminated] = useState(false);

  useEffect(() => {
    socket.on(SOCKET_EVENT.PlayerEliminated, (eliminatedId: string) => shouldBeEliminated(eliminatedId === id));
    return () => void socket.off(SOCKET_EVENT.PlayerEliminated);
  }, []);

  return (
    <div css={[opponentStyle, isEliminated && disabledStyle]}>
      <Status id={id} />
      <div css={opponentNameStyle}>{name}</div>
      <SpellAnimation id={id} />
    </div>
  );
};

export default Opponent;
