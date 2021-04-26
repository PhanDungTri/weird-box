import { Server, Socket } from "socket.io";
import { CLIENT_EVENT_NAME, PASSIVE_ACTION, SERVER_EVENT_NAME, SPELL_NAME } from "./constants";

export type GameMatchingStatus = "finding" | "found" | "canceled";

export type ClientInfo = {
  id: string;
  name: string;
};

export type PlayerInfo = ClientInfo & {
  isEliminated: boolean;
};

export type CardInfo = {
  id: string;
  power: number;
  spell: SPELL_NAME;
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

export type RoomInfo = {
  id: string;
  owner: string;
  members: ClientInfo[];
};

export type NotificationVariant = "Danger" | "Safe" | "Info" | "Warning";

export interface EventsFromServer {
  [SERVER_EVENT_NAME.Notify]: (msg: string, variant: NotificationVariant) => void;
  [SERVER_EVENT_NAME.UpdateGameMatchingStatus]: (status: GameMatchingStatus) => void;
  [SERVER_EVENT_NAME.GetGameSettings]: (maxHP: number, timePerTurn: number) => void;
  [SERVER_EVENT_NAME.GetPlayerList]: (list: PlayerInfo[]) => void;
  [SERVER_EVENT_NAME.NewGame]: () => void;
  [SERVER_EVENT_NAME.GetCards]: (cards: CardInfo[]) => void;
  [SERVER_EVENT_NAME.ChargePointChanged]: (point: number) => void;
  [SERVER_EVENT_NAME.Overcharged]: () => void;
  [SERVER_EVENT_NAME.CardPlayed]: (card: CardInfo) => void;
  [SERVER_EVENT_NAME.HitPointChanged]: (target: string, hp: number) => void;
  [SERVER_EVENT_NAME.PlayerEliminated]: (id: string) => void;
  [SERVER_EVENT_NAME.GameOver]: (id: string) => void;
  [SERVER_EVENT_NAME.NewTurn]: (id: string, deck: number) => void;
  [SERVER_EVENT_NAME.TakeSpell]: (spell: SpellInfo) => void;
  [SERVER_EVENT_NAME.ActivatePassive]: (passive: PassiveAction) => void;
  [SERVER_EVENT_NAME.FriendJoined]: (friend: ClientInfo) => void;
  [SERVER_EVENT_NAME.FriendLeft]: (id: string) => void;
  [SERVER_EVENT_NAME.GetRoomInfo]: (info: RoomInfo) => void;
}

export interface EventsFromClient {
  [CLIENT_EVENT_NAME.Rename]: (name: string) => void;
  [CLIENT_EVENT_NAME.FindGame]: () => void;
  [CLIENT_EVENT_NAME.Ready]: () => void;
  [CLIENT_EVENT_NAME.RejectGame]: () => void;
  [CLIENT_EVENT_NAME.PlayCard]: (id: string, cb: (err: boolean, msg?: string) => void) => void;
  [CLIENT_EVENT_NAME.LeaveGame]: () => void;
  [CLIENT_EVENT_NAME.CreateRoom]: () => void;
  [CLIENT_EVENT_NAME.JoinRoom]: (id: string) => void;
}

export type ClientSocket = Socket<EventsFromClient, EventsFromServer>;
export type GameSocket = Server<EventsFromClient, EventsFromServer>;