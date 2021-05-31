import { atom } from "jotai";
import { StyleVariation } from "../../shared/@types";

type Notification = {
  id: string;
  message: string;
  variation: StyleVariation;
};

export const notificationsAtom = atom<Notification[]>([]);
