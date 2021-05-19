import { RoomInfo } from "../../shared/@types";
import { MAX_PLAYERS_PER_GAME, SERVER_EVENT_NAME } from "../../shared/constants";
import generateUniqueId from "../../shared/utils/generateUniqueId";
import Client from "./Client";
import IdleState from "./Client/State/IdleState";
import InRoomState from "./Client/State/InRoomState";
import RoomOwnerState from "./Client/State/RoomOwnerState";
import Server from "./Server";

class Room {
  public readonly id = generateUniqueId();
  private members: Client[] = [];
  private blacklist: Client[] = [];
  private ownerId: string;

  constructor(owner: Client) {
    this.members.push(owner);
    this.ownerId = owner.getId();
    owner.changeState(new RoomOwnerState(owner, this));
  }

  public getMembers(): Client[] {
    return this.members;
  }

  public getInfo(): RoomInfo {
    return {
      id: this.id,
      owner: this.ownerId,
      members: this.members.map((g) => g.getInfo()),
    };
  }

  public getSize(): number {
    return this.members.length;
  }

  public add(client: Client): void {
    if (this.members.length >= MAX_PLAYERS_PER_GAME - 1) throw Error("Room is full!");
    if (this.members.includes(client)) throw Error("You are already in room!");
    if (this.blacklist.includes(client)) throw Error("You aren't permitted to join this room!");

    this.members.forEach((m) => m.getSocket().emit(SERVER_EVENT_NAME.FriendJoined, client.getInfo()));
    this.members.push(client);
    client.changeState(new InRoomState(client, this));
  }

  public remove(client: Client): void {
    client.changeState(new IdleState(client));

    if (client.getId() === this.ownerId) {
      const newOwner = this.members.find((m) => m.getId() !== this.ownerId);
      if (newOwner) {
        this.ownerId = newOwner.getId();
        // We must not change the players state if they are in a game, because the players will lost their in game state
        if (newOwner.getState() instanceof InRoomState) newOwner.changeState(new RoomOwnerState(newOwner, this));
      }
    }

    client.getSocket().emit(SERVER_EVENT_NAME.LeftRoom);
    this.members = this.members.filter((g) => g !== client);
    this.members.forEach((m) => m.getSocket().emit(SERVER_EVENT_NAME.FriendLeft, client.getId(), this.ownerId));

    if (this.getSize() === 0) Server.getInstance().removeRoom(this);
  }

  public kick(id: string): void {
    if (id === this.ownerId) throw new Error("Can't kick yourself!");

    const client = this.members.find((m) => m.getId() === id);

    if (client) {
      this.remove(client);
      this.blacklist.push(client);
      client.getSocket().emit(SERVER_EVENT_NAME.Notify, "You got kicked!", "Warning");
    } else throw new Error("Invalid member!");
  }

  public back(client: Client): void {
    client.changeState(
      client.getId() === this.ownerId ? new RoomOwnerState(client, this) : new InRoomState(client, this)
    );
  }
}

export default Room;
