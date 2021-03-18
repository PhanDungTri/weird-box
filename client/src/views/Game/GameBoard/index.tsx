import { useGameState } from "../../../hooks/useStore";
import { centerizeStyle } from "../../../styles";
import Card from "../Card";
import BoxOfCard from "./BoxOfCard";
import ChargePointBar from "./ChargePointBar";
import { cardPlayedAnimation, gameBoardStyle } from "./styles";

const GameBoard = (): JSX.Element => {
  const recentPlayedCard = useGameState((state) => state.recentPlayedCard);
  const resetRecentPlayedCard = useGameState((state) => state.resetRecentPlayedCard);

  return (
    <div css={gameBoardStyle}>
      <BoxOfCard />
      <ChargePointBar />
      {recentPlayedCard && (
        <div onTransitionEnd={resetRecentPlayedCard} css={[cardPlayedAnimation, centerizeStyle]}>
          <Card card={recentPlayedCard} />
        </div>
      )}
    </div>
  );
};

export default GameBoard;
