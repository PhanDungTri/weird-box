import { memo } from "react";
import useCommonPlayerState from "../../../hooks/useCommonPlayerState";
import socket from "../../../services/socket";
import SpellAnimation from "../SpellAnimation";
import Status from "../Status";
import Hand from "./Hand";

const Player = (): JSX.Element => {
  const { isEliminated, triggeredSpell, resetTriggeredSpell } = useCommonPlayerState(socket.id);

  return (
    <>
      <div>
        <Status id={socket.id} horizontal />
        <Hand eliminated={isEliminated} />
      </div>
      <SpellAnimation spell={triggeredSpell} scale={4} onAnimationEnd={resetTriggeredSpell} />
    </>
  );
};

export default memo(Player);
