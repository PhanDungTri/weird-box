import { Server, Socket } from "socket.io";
import { PASSIVE_ACTION, SPELL_NAME } from "../constants";

export interface EventsFromServer {
  "find game": (name: string, cb: (name: string) => void) => void;
}

export interface EventsFromClient {
  "find game": (name: string, cb: (name: string) => void) => void;
}

export type ClientSocket = Socket<EventsFromServer, EventsFromClient>;
export type GameSocket = Server<EventsFromServer, EventsFromClient>;

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
