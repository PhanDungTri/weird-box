import { useCallback } from "react";
import { SPELL_NAME, PASSIVE_ACTION } from "../../shared/constants";
import { useGameState } from "./useStore";

type CommonPlayerStateHook = {
  isEliminated: boolean;
  triggeredSpell: SPELL_NAME | PASSIVE_ACTION;
  resetTriggeredSpell: () => void;
};

const useCommonPlayerState = (id: string): CommonPlayerStateHook => {
  const isEliminated = useGameState(useCallback((state) => state.players[id].isEliminated, [id]));
  const triggeredSpell = useGameState(useCallback((state) => state.players[id].triggeredSpell, [id]));
  const resetTriggeredSpell = useGameState(useCallback((state) => () => state.resetTriggeredSpell(id), [id]));

  return { isEliminated, triggeredSpell, resetTriggeredSpell };
};

export default useCommonPlayerState;
