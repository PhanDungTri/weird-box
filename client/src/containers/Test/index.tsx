import { gridStyle } from "../../styles";
import Opponent from "../Game/Opponents/Opponent";
import { opponentsStyle } from "../Game/Opponents/styles";

const Test = (): JSX.Element => {
  return (
    <div css={[gridStyle, opponentsStyle]}>
      <Opponent id="" name="abcd" isEliminated={false} />
    </div>
  );
};

export default Test;
