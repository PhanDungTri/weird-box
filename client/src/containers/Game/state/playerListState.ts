import { createState, useState } from "@hookstate/core";
import { IPlayer } from "../../../../../shared/src/interfaces/Player";

type PlayerList = Record<string, IPlayer>;

const defaultPlayer: IPlayer = {
  id: "",
  name: "name",
  hp: 0,
};

const playerListState = createState<PlayerList>({});

const usePlayerListState = (id?: string): IPlayer | IPlayer[] => {
  const state = useState(playerListState);
  if (id) return state[id].get() || defaultPlayer;
  return Object.values(state.get());
};

export { playerListState, usePlayerListState };
export type { PlayerList };
