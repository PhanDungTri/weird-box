import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { SERVER_EVENT_NAME } from "../../shared/constants";
import { soundAtom } from "../atoms";
import { useListenServerEvent } from "./useListenServerEvent";

export const useOnEliminate = (id: string): boolean => {
  const [isEliminated, eliminate] = useState(false);
  const [sound] = useAtom(soundAtom);

  useEffect(() => {
    if (isEliminated) sound?.play("Eliminated");
  }, [isEliminated]);

  useListenServerEvent(SERVER_EVENT_NAME.PlayerEliminated, (target: string) => eliminate(target === id));
  return isEliminated;
};
