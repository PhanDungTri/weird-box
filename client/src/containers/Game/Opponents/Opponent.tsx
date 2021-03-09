import { PlayerInfo } from "../../../@types";
import { disabledStyle, gridStyle, headingStyle } from "../../../styles";
import SpellAnimation from "../SpellAnimation";
import Status from "../Status";
import { opponentNameStyle, opponentStyle } from "./styles";

const Opponent = ({ id, name, isEliminated }: PlayerInfo): JSX.Element => {
  return (
    <div css={[gridStyle, opponentStyle, isEliminated && disabledStyle]}>
      <Status id={id} />
      <div css={[opponentNameStyle, headingStyle]}>{name}</div>
      <SpellAnimation id={id} />
    </div>
  );
};

export default Opponent;
