import produce from "immer";
import create from "zustand/vanilla";
import { CardInfo } from "../../../shared/src/@types";

type HandState = {
  cards: CardInfo[];
  removeCard: (id: string) => void;
};

const handState = create<HandState>((set, get) => ({
  cards: [],
  removeCard: (id: string) =>
    set({
      cards: produce(get().cards, (draft) => {
        draft.filter((c) => c.id !== id);
      }),
    }),
}));

export default handState;
