import { IPlayer } from "./Player";

interface IGame {
  maxHP: number;
  players: IPlayer[];
  timePerTurn: number;
}

export type { IGame };
