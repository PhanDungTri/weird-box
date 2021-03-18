import shallow from "zustand/shallow";
import { useGameState } from "../../../hooks/useStore";
import HitPointBar from "./HitPointBar";
import Spells from "./Spells";
import { horizontalStatusStyle, statusStyle } from "./styles";
import Timer from "./Timer";

type StatusProps = {
  id: string;
  horizontal?: boolean;
};

const Status = ({ id, horizontal = false }: StatusProps): JSX.Element => {
  const { maxHP, timePerTurn } = useGameState((state) => state.settings);
  const currentPlayer = useGameState((state) => state.currentPlayer);
  const hp = useGameState((state) => state.players[id].hp);
  const spells = useGameState((state) => Object.values(state.spells).filter((s) => s.target === id), shallow);

  return (
    <div css={[statusStyle, horizontal && horizontalStatusStyle]}>
      <HitPointBar hp={hp} maxHP={maxHP} />
      <Spells spells={spells} align={horizontal ? "left" : "center"} />
      {currentPlayer === id && <Timer timePerTurn={timePerTurn} fluid={horizontal} />}
    </div>
  );
};

export default Status;
