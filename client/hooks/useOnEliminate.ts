import { useEffect, useState } from "react";
import { SERVER_EVENT_NAME } from "../../shared/constants";
import { useListenServerEvent } from "./useListenServerEvent";
import EliminateSound from "../assets/sounds/eliminate.mp3";
import { Howl } from "howler";

export const useOnEliminate = (id: string): boolean => {
  const [isEliminated, eliminate] = useState(false);
  const [eliminateSound] = useState(new Howl({ src: [EliminateSound] }));

  useEffect(() => {
    if (isEliminated) eliminateSound.play();
  }, [isEliminated]);

  useListenServerEvent(SERVER_EVENT_NAME.PlayerEliminated, (target: string) => eliminate(target === id));
  return isEliminated;
};
