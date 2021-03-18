import { memo, useCallback } from "react";
import useCommonPlayerState from "../../../hooks/useCommonPlayerState";
import { useGameState } from "../../../hooks/useStore";
import { disabledStyle } from "../../../styles";
import SpellAnimation from "../SpellAnimation";
import Status from "../Status";
import { opponentNameStyle, opponentStyle } from "./styles";

type OpponentProps = {
  id: string;
};

const Opponent = ({ id }: OpponentProps): JSX.Element => {
  const name = useGameState(useCallback((state) => state.players[id].name, [id]));
  const { isEliminated, triggeredSpell, resetTriggeredSpell } = useCommonPlayerState(id);

  return (
    <div css={[opponentStyle, isEliminated && disabledStyle]}>
      <Status id={id} />
      <div css={opponentNameStyle}>{name}</div>
      <SpellAnimation spell={triggeredSpell} onAnimationEnd={resetTriggeredSpell} />
    </div>
  );
};

export default memo(Opponent);
