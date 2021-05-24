import { atom } from "jotai";
import { ROUTE } from "../constants";

export const routeAtom = atom<ROUTE>(ROUTE.Init);
