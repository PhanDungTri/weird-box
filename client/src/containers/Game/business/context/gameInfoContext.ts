import { useState } from "react";
import { IGame } from "../../../../../../shared/src/interfaces/Game";

type GameInfo = Omit<IGame, "players">;

interface GameInfoHook extends GameInfo {
  setGameInfo: React.Dispatch<React.SetStateAction<GameInfo>>;
}

const useGameInfo = (): GameInfoHook => {
  const [{ maxHP, timePerTurn }, setGameInfo] = useState<GameInfo>({ maxHP: 0, timePerTurn: 0 });
  return { maxHP, setGameInfo, timePerTurn };
};

export default useGameInfo;
