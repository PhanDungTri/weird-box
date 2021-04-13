import { memo } from "react";
import { PlayerInfo } from "../../../../shared/@types";
import { useOnEliminate } from "../../../hooks";
import { disabledStyle } from "../../../styles";
import SpellAnimation from "../SpellAnimation";
import Status from "../Status";
import { opponentNameStyle, opponentStyle } from "./styles";

const Opponent = ({ id, name }: PlayerInfo): JSX.Element => {
  const isEliminated = useOnEliminate(id);

  return (
    <div css={[opponentStyle, isEliminated && disabledStyle]}>
      <Status id={id} />
      <div css={opponentNameStyle}>{name}</div>
      <SpellAnimation id={id} />
    </div>
  );
};

export default memo(Opponent);
