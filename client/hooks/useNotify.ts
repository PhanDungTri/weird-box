import produce from "immer";
import { useAtom } from "jotai";
import { StyleVariation } from "../../shared/@types";
import { generateUniqueId } from "../../shared/utils";
import { notificationsAtom, soundAtom } from "../atoms";

const HIDE_TIMEOUT = 1500;

export const useNotify = (): ((message: string, variation: StyleVariation) => void) => {
  const [sound] = useAtom(soundAtom);
  const [notifications, setNotifications] = useAtom(notificationsAtom);

  const notify = (message: string, variation: StyleVariation) => {
    const id = generateUniqueId();

    setNotifications(
      produce(notifications, (draft) => {
        if (draft.length === 3) draft.shift();
        draft.push({ id, message, variation });
      })
    );

    sound?.play(variation);
    setTimeout(() => setNotifications((notis) => notis.slice(1)), HIDE_TIMEOUT);
  };

  return notify;
};
