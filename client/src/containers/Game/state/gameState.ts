import { createState, useState } from "@hookstate/core";

interface GameState {
  maxHP: number;
}

const gameState = createState<GameState>({ maxHP: 0 });
const useGameState = (): GameState => useState(gameState).value;

export { gameState, useGameState };
export type { GameState };
