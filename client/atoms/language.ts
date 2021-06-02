import { atom } from "jotai";
import language from "../languages";

export const chosenLanguageAtom = atom<"en" | "vi">("en");
export const languageAtom = atom((get) => language[get(chosenLanguageAtom)]);
