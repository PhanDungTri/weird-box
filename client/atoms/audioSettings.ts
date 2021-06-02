import { atom } from "jotai";

type AudioSettings = {
  music: boolean;
  sound: boolean;
};

export const audioSettingsAtom = atom<AudioSettings>({
  music: true,
  sound: true,
});
