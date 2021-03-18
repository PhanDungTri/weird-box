import { SPELL_NAME } from "../../../../../shared/src/@enums";
import { useGameState } from "../../../hooks/useStore";
import { disabledStyle } from "../../../styles";
import SpellAnimation from "../SpellAnimation";
import Status from "../Status";
import { opponentNameStyle, opponentStyle } from "./styles";

type OpponentProps = {
  id: string;
};

const Opponent = ({ id }: OpponentProps): JSX.Element => {
  const name = useGameState((state) => state.players[id].name);
  const isEliminated = useGameState((state) => state.players[id].isEliminated);
  const triggeredSpell = useGameState((state) => state.players[id].triggeredSpell);

  return (
    <div css={[opponentStyle, isEliminated && disabledStyle]}>
      <Status id={id} />
      <div css={opponentNameStyle}>{name}</div>
      {triggeredSpell !== SPELL_NAME.Void && <SpellAnimation spell={triggeredSpell} />}
    </div>
  );
};

export default Opponent;
