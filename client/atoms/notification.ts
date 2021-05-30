import { atom } from "jotai";
import { StyleVariant } from "../../shared/@types";

type Notification = {
  id: string;
  message: string;
  variant: StyleVariant;
};

export const notificationsAtom = atom<Notification[]>([]);
