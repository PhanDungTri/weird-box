import { atom } from "jotai";
import { RoomInfo } from "../../shared/@types";

export const roomAtom = atom<RoomInfo | undefined>(undefined);
