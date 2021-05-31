import BoxOfCard from "./BoxOfCard";
import DeckCounter from "./DeckCounter";
import RecentPlayedCard from "./RecentPlayedCard";
import { StyledGameBoard } from "./styles";

const GameBoard = (): JSX.Element => {
  return (
    <StyledGameBoard>
      <BoxOfCard />
      <RecentPlayedCard />
      <DeckCounter />
    </StyledGameBoard>
  );
};

export default GameBoard;
