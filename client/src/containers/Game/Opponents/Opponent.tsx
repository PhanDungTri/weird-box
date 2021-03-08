import { PlayerInfo } from "../../../@types";
import { headingStyle } from "../../../styles/textStyle";
import SpellAnimation from "../SpellAnimation";
import Status from "../Status";
import { opponentNameStyle, opponentStyle } from "./styles";

const Opponent = ({ id, name, isEliminated }: PlayerInfo): JSX.Element => {
  return (
    <div css={opponentStyle(isEliminated)}>
      <Status id={id} />
      <div css={[opponentNameStyle, headingStyle]}>{name}</div>
      <SpellAnimation id={id} />
    </div>
  );
};

export default Opponent;
