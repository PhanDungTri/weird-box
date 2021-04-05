import { Server, Socket } from "socket.io";
import { PASSIVE_ACTION, SPELL_NAME } from "../constants";

export type GameMatcherStatus = "finding" | "found" | "canceled";
export type PlayerInfo = {
  id: string;
  name: string;
  isEliminated: boolean;
};

export interface EventsFromServer {
  "update game matcher status": (status: GameMatcherStatus) => void;
  "get game settings": (maxHP: number, timePerTurn: number) => void;
  "get player list": (list: PlayerInfo[]) => void;
}

export interface EventsFromClient {
  "find game": (name: string, cb: (name: string) => void) => void;
  ready: () => void;
  "reject game": () => void;
}

export type ClientSocket = Socket<EventsFromClient, EventsFromServer>;
export type GameSocket = Server<EventsFromClient, EventsFromServer>;

export type GameSettings = {
  maxHP: number;
  timePerTurn: number;
};

export type HitPointChange = {
  target: string;
  hp: number;
};

export type SpellInfo = {
  id: string;
  name: SPELL_NAME;
  power: number;
  duration: number;
  target: string;
};

export type PassiveAction = {
  id: string;
  action: PASSIVE_ACTION;
  target: string;
};

export type CardInfo = {
  id: string;
  power: number;
  spell: SPELL_NAME;
};
