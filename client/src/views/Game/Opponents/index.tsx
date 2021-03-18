import shallow from "zustand/shallow";
import { useGameState } from "../../../hooks/useStore";
import EmptySlot from "./EmptySlot";
import Opponent from "./Opponent";
import { opponentsStyle } from "./styles";

const Opponents = (): JSX.Element => {
  const opponents = useGameState((state) => Object.keys(state.players), shallow);

  const showOpponents = () => {
    const elm: JSX.Element[] = [];

    for (let i = 0; i < 3; i++)
      if (opponents[i]) elm.push(<Opponent id={opponents[i]} key={opponents[i]} />);
      else elm.push(<EmptySlot key={i} />);

    return elm;
  };

  return <div css={opponentsStyle}>{showOpponents()}</div>;
};

export default Opponents;
