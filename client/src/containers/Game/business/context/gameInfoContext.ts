import { useState } from "react";

interface GameInfo {
  maxHP: number;
}

interface GameInfoHook extends GameInfo {
  setGameInfo: React.Dispatch<React.SetStateAction<GameInfo>>;
}

const useGameInfo = (): GameInfoHook => {
  const [{ maxHP }, setGameInfo] = useState<GameInfo>({ maxHP: 0 });
  return { maxHP, setGameInfo };
};

export default useGameInfo;
