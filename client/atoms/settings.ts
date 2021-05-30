import { atom } from "jotai";

type Settings = {
  music: boolean;
  sound: boolean;
};

export const settingsAtom = atom<Settings>({
  music: true,
  sound: true,
});
