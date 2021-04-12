import { memo, useCallback, useEffect, useState } from "react";
import { PlayerInfo, SERVER_EVENT_NAME } from "../../../../shared/@types";
import useCommonPlayerState from "../../../hooks/useCommonPlayerState";
import { useGameState } from "../../../hooks/useStore";
import socket from "../../../services/socket";
import { disabledStyle } from "../../../styles";
import SpellAnimation from "../SpellAnimation";
import Status from "../Status";
import { opponentNameStyle, opponentStyle } from "./styles";

const Opponent = ({ id, name }: PlayerInfo): JSX.Element => {
  const [isEliminated, eliminate] = useState(false);

  useEffect(() => {
    const onEliminatePlayer = (target: string) => {
      if (target === id) eliminate(true);
    };

    socket.on(SERVER_EVENT_NAME.PlayerEliminated, onEliminatePlayer);
    return () => void socket.off(SERVER_EVENT_NAME.PlayerEliminated, onEliminatePlayer);
  }, []);

  return (
    <div css={[opponentStyle, isEliminated && disabledStyle]}>
      <Status id={id} />
      <div css={opponentNameStyle}>{name}</div>
      <SpellAnimation id={id} />
    </div>
  );
};

export default memo(Opponent);
