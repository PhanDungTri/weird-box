import { Server, Socket } from "socket.io";
import { PASSIVE_ACTION, SPELL_NAME } from "../constants";

export enum SERVER_EVENT_NAME {
  UpdateGameMatcherStatus = "update game matcher status",
  GetGameSettings = "get game settings",
  GetPlayerList = "get player list",
}

export enum CLIENT_EVENT_NAME {
  FindGame = "find game",
  Ready = "ready",
  RejectGame = "reject game",
}

export type GameMatcherStatus = "finding" | "found" | "canceled";

export type PlayerInfo = {
  id: string;
  name: string;
  isEliminated: boolean;
};

export interface EventsFromServer {
  [SERVER_EVENT_NAME.UpdateGameMatcherStatus]: (status: GameMatcherStatus) => void;
  [SERVER_EVENT_NAME.GetGameSettings]: (maxHP: number, timePerTurn: number) => void;
  [SERVER_EVENT_NAME.GetPlayerList]: (list: PlayerInfo[]) => void;
}

export interface EventsFromClient {
  [CLIENT_EVENT_NAME.FindGame]: (name: string, cb: (name: string) => void) => void;
  [CLIENT_EVENT_NAME.Ready]: () => void;
  [CLIENT_EVENT_NAME.RejectGame]: () => void;
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
