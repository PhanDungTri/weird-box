import { useGameState } from "../../../hooks/useStore";
import { GameState } from "../../../store";
import { centerizeStyle } from "../../../styles";
import Card from "../Card";
import BoxOfCard from "./BoxOfCard";
import ChargePointBar from "./ChargePointBar";
import { cardPlayedAnimation, gameBoardStyle } from "./styles";

const selectRecentPlayedCard = (state: GameState) => state.recentPlayedCard;
const selectResetRecentPlayedCard = (state: GameState) => state.resetRecentPlayedCard;

const GameBoard = (): JSX.Element => {
  const recentPlayedCard = useGameState(selectRecentPlayedCard);
  const resetRecentPlayedCard = useGameState(selectResetRecentPlayedCard);

  return (
    <div css={gameBoardStyle}>
      <BoxOfCard />
      <ChargePointBar />
      {recentPlayedCard && (
        <div onAnimationEnd={resetRecentPlayedCard} css={[cardPlayedAnimation, centerizeStyle]}>
          <Card card={recentPlayedCard} />
        </div>
      )}
    </div>
  );
};

export default GameBoard;
