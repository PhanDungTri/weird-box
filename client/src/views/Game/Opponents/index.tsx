import shallow from "zustand/shallow";
import { useGameState } from "../../../hooks/useStore";
import socket from "../../../services/socket";
import { GameState } from "../../../store";
import EmptySlot from "./EmptySlot";
import Opponent from "./Opponent";
import { opponentsStyle } from "./styles";

const selectOpponents = (state: GameState) => Object.keys(state.players).filter((p) => p !== socket.id);

const Opponents = (): JSX.Element => {
  const opponents = useGameState(selectOpponents, shallow);

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
