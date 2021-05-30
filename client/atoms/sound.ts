import { Howl } from "howler";
import { atom } from "jotai";

export const soundAtom = atom<Howl | null>(null);
export const musicAtom = atom<Howl | null>(null);
