import { atom } from "recoil";
import IPlayer from "../../interfaces/IPlayer";

interface PlayerListState {
  players: IPlayer[];
  current: string;
}

const playerListState = atom<PlayerListState>({
  key: "playerListState",
  default: {
    players: [],
    current: "",
  },
});
