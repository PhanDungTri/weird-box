import { IEffect } from "./Effect";

interface IPlayer {
  id: string;
  name: string;
  hp: number;
  effects: IEffect[];
}

export { IPlayer };
