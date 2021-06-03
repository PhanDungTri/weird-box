import { RoomInfo } from "../../shared/@types";
import { SERVER_EVENT_NAME } from "../../shared/constants";
import { MAX_PLAYERS_PER_GAME } from "../../shared/config";
import { generateUniqueId } from "../../shared/utils";
import Client from "./Client";
import IdleState from "./Client/State/IdleState";
import InRoomState from "./Client/State/InRoomState";
import RoomOwnerState from "./Client/State/RoomOwnerState";
import Server from "./Server";

class Room {
  public readonly id = generateUniqueId();
  public isInGame = false;
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
    if (this.isInGame) throw Error("errRoomInGame");
    if (this.members.length >= MAX_PLAYERS_PER_GAME - 1) throw Error("errRoomFull");
    if (this.members.includes(client)) throw Error("errGeneric");
    if (this.blacklist.includes(client)) throw Error("errNoPremission");

    this.members.forEach((m) => m.getSocket().emit(SERVER_EVENT_NAME.FriendJoined, client.getInfo()));
    this.members.push(client);
    client.getSocket().emit(SERVER_EVENT_NAME.JoinedRoom);
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
    if (id === this.ownerId) throw new Error("errGeneric");

    const client = this.members.find((m) => m.getId() === id);

    if (client) {
      this.remove(client);
      this.blacklist.push(client);
      client.getSocket().emit(SERVER_EVENT_NAME.Notify, "notiKick", "Warning");
    } else throw new Error("errGeneric");
  }

  public back(client: Client): void {
    client.changeState(
      client.getId() === this.ownerId ? new RoomOwnerState(client, this) : new InRoomState(client, this)
    );
  }
}

export default Room;
