import { memo, useCallback } from "react";
import shallow from "zustand/shallow";
import { useGameState } from "../../../hooks/useStore";
import { GameState, selectCurrentPlayer } from "../../../store";
import HitPointBar from "./HitPointBar";
import Spells from "./Spells";
import { horizontalStatusStyle, statusStyle } from "./styles";
import Timer from "./Timer";

type StatusProps = {
  id: string;
  horizontal?: boolean;
};

const selectGameSettings = (state: GameState) => state.settings;

const Status = ({ id, horizontal = false }: StatusProps): JSX.Element => {
  const { maxHP, timePerTurn } = useGameState(selectGameSettings);
  const currentPlayer = useGameState(selectCurrentPlayer);
  const hp = useGameState(useCallback((state) => state.players[id].hp, [id]));
  const spells = useGameState(
    useCallback((state) => Object.values(state.spells).filter((s) => s.target === id), [id]),
    shallow
  );

  return (
    <div css={[statusStyle, horizontal && horizontalStatusStyle]}>
      <HitPointBar hp={hp} maxHP={maxHP} />
      <Spells spells={spells} align={horizontal ? "left" : "center"} />
      {currentPlayer === id && <Timer timePerTurn={timePerTurn} fluid={horizontal} />}
    </div>
  );
};

export default memo(Status);
