import { atom } from "jotai";
import { RoomInfo } from "../../../shared/@types";

const playerNameAtom = atom("player");
const roomAtom = atom<RoomInfo | undefined>(undefined);

export { playerNameAtom, roomAtom };
