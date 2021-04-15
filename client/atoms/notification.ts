import produce from "immer";
import { atom } from "jotai";
import { Getter, Setter } from "jotai/core/types";
import generateUniqueId from "../../shared/utils/generateUniqueId";
import { Notification } from "../@types";

const HIDE_TIMEOUT = 1500;
const list = atom<Notification[]>([]);

const notify = (get: Getter, set: Setter, { message, variant }: Pick<Notification, "message" | "variant">) => {
  const id = generateUniqueId();
  const notifications = produce(get(list), (draft) => {
    if (draft.length >= 3) draft.shift();
    draft.push({ id, message, variant });
  });

  set(list, notifications);
  setTimeout(() => set(list, get(list).slice(0, -1)), HIDE_TIMEOUT);
};

export const notificationsAtom = atom<Notification[], Pick<Notification, "message" | "variant">>(
  (get) => get(list),
  notify
);
