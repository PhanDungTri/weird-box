import BoxOfCard from "./BoxOfCard";
import ChargePointBar from "./ChargePointBar";
import DeckCounter from "./DeckCounter";
import RecentPlayedCard from "./RecentPlayedCard";
import { gameBoardStyle } from "./styles";

const GameBoard = (): JSX.Element => {
  return (
    <div css={gameBoardStyle}>
      <BoxOfCard />
      <ChargePointBar />
      <RecentPlayedCard />
      <DeckCounter />
    </div>
  );
};

export default GameBoard;
