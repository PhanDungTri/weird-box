import { useGameState } from "../../../hooks/useStore";
import socket from "../../../services/socket";
import SpellAnimation from "../SpellAnimation";
import Status from "../Status";
import Hand from "./Hand";

const Player = (): JSX.Element => {
  const isEliminated = useGameState((state) => state.players[socket.id].isEliminated);
  const triggeredSpell = useGameState((state) => state.players[socket.id].triggeredSpell);

  return (
    <>
      <div>
        <Status id={socket.id} horizontal />
        <Hand eliminated={isEliminated} />
      </div>
      <SpellAnimation spell={triggeredSpell} scale={4} />
    </>
  );
};

export default Player;
