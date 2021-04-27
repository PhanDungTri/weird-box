import { RoomInfo } from "../../shared/@types";
import { MAX_PLAYERS_PER_GAME, SERVER_EVENT_NAME } from "../../shared/constants";
import generateUniqueId from "../../shared/utils/generateUniqueId";
import Client from "./Client";
import Lobby from "./Lobby";
import Server from "./Server";

class Room {
  public readonly id = generateUniqueId();
  private guests = new Set<Client>();

  constructor(private owner: Client) {
    this.owner.getSocket().emit(SERVER_EVENT_NAME.GetRoomInfo, this.getInfo());
  }

  public findGame(): void {
    new Lobby([this.owner, ...Array.from(this.guests)], undefined, true);
  }

  public getOwner(): Client {
    return this.owner;
  }

  public getInfo(): RoomInfo {
    return {
      id: this.id,
      owner: this.owner.id,
      members: [this.owner.getInfo(), ...Array.from(this.guests).map((g) => g.getInfo())],
    };
  }

  public getSize(): number {
    return this.guests.size + 1;
  }

  public has(client: Client): boolean {
    return this.owner === client || this.guests.has(client);
  }

  public add(client: Client): void {
    if (this.guests.size >= MAX_PLAYERS_PER_GAME - 1) throw Error("Room is full!");
    if (this.guests.has(client) || client === this.owner) throw Error("You are already in room!");

    this.owner.getSocket().emit(SERVER_EVENT_NAME.FriendJoined, client.getInfo());
    this.guests.forEach((f) => f.getSocket().emit(SERVER_EVENT_NAME.FriendJoined, client.getInfo()));
    this.guests.add(client);
    client.getSocket().emit(SERVER_EVENT_NAME.GetRoomInfo, this.getInfo());
  }

  public remove(client: Client): void {
    if (client === this.owner) {
      if (this.guests.size > 0) {
        this.owner = Array.from(this.guests)[0];
        // TODO tell everybody that the owner has been changed
      } else {
        Server.getInstance().removeRoom(this);
      }
    } else if (this.guests.delete(client)) {
      this.owner.getSocket().emit(SERVER_EVENT_NAME.FriendLeft, client.id);
      this.guests.forEach((f) => f.getSocket().emit(SERVER_EVENT_NAME.FriendLeft, client.id));
    }
  }
}

export default Room;
