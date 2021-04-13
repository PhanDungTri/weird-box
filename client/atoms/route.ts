import { atom } from "jotai";
import ROUTE from "../constants/ROUTE";

export const routeAtom = atom<ROUTE>(ROUTE.Hub);
