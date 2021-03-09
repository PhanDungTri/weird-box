import { createState, useState } from "@hookstate/core";
import { IGame } from "../../../../../shared/src/interfaces/Game";

const gameState = createState<Omit<IGame, "players">>({ maxHP: 0 });
const useGameState = (): Omit<IGame, "players"> => useState(gameState).value;

export { gameState, useGameState };
