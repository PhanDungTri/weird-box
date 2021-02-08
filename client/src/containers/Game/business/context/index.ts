import constate from "constate";
import useCardChoice from "./cardChoiceContext";
import useCurrentPlayer from "./currentPlayerContext";
import useGameInfo from "./gameInfoContext";

const gameContext = () => {
  return {
    cardChoice: useCardChoice(),
    currentPlayer: useCurrentPlayer(),
    gameInfo: useGameInfo(),
  };
};

const [GameProvider, useCardChoiceContext, useCurrentPlayerContext, useGameInfoContext] = constate(
  gameContext,
  (value) => value.cardChoice,
  (value) => value.currentPlayer,
  (value) => value.gameInfo
);

export { GameProvider, useCardChoiceContext, useCurrentPlayerContext, useGameInfoContext };
