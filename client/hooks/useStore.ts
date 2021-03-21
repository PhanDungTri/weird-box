import create from "zustand";
import { appState, boxOfCardState, gameState, handState } from "../store";

export const useAppState = create(appState);
export const useGameState = create(gameState);
export const useHandState = create(handState);
export const useBoxOfCardState = create(boxOfCardState);
