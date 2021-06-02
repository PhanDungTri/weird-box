import Client from "..";
import { SERVER_EVENT_NAME, CLIENT_EVENT_NAME } from "../../../../shared/constants";
import MatchingChecker from "../../ReadyChecker/MatchingChecker";
import Room from "../../Room";
import InRoomState from "./InRoomState";

class RoomOwnerState extends InRoomState {
  constructor(client: Client, room: Room) {
    super(client, room);
    this.startGame = this.startGame.bind(this);
    this.kick = this.kick.bind(this);
  }

  private startGame() {
    if (this.room.getSize() < 2) this.socket.emit(SERVER_EVENT_NAME.Notify, "errNotEnoughPlayer", "Danger");
    else if (this.room.getMembers().some((c) => !(c.getState() instanceof InRoomState)))
      this.socket.emit(SERVER_EVENT_NAME.Notify, "errNotReadyInRoom", "Danger");
    else new MatchingChecker(this.room.getMembers(), this.room);
  }

  private kick(id: string) {
    try {
      this.room.kick(id);
    } catch (e) {
      this.socket.emit(SERVER_EVENT_NAME.Notify, e.message, "Danger");
    }
  }

  public enter(): void {
    super.enter();
    this.socket.on(CLIENT_EVENT_NAME.FindGame, this.startGame);
    this.socket.on(CLIENT_EVENT_NAME.Kick, this.kick);
  }

  public exit(): void {
    super.exit();
    this.socket.off(CLIENT_EVENT_NAME.FindGame, this.startGame);
    this.socket.off(CLIENT_EVENT_NAME.Kick, this.kick);
  }
}

export default RoomOwnerState;
