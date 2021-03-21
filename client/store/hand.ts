import { devtools } from "zustand/middleware";
import create from "zustand/vanilla";
import { CardInfo } from "../../shared/@types";

export type HandState = {
  cards: CardInfo[];
  removeCard: (id: string) => void;
};

const handState = create<HandState>(
  devtools((set, get) => ({
    cards: [],
    removeCard: (id: string) =>
      set({
        cards: get().cards.filter((c) => c.id !== id),
      }),
  }))
);

export default handState;
