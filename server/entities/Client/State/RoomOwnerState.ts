import Client from "..";
import { SERVER_EVENT_NAME, CLIENT_EVENT_NAME } from "../../../../shared/constants";
import MatchingChecker from "../../ReadyChecker/MatchingChecker";
import Room from "../../Room";
import InRoomState from "./InRoomState";

class RoomOwnerState extends InRoomState {
  private onStartGame: () => void;
  private onKick: (id: string) => void;

  constructor(client: Client, room: Room) {
    super(client, room);
    this.onStartGame = this.startGame.bind(this);
    this.onKick = this.kick.bind(this);
  }

  private startGame() {
    if (this.room.getSize() < 2) this.socket.emit(SERVER_EVENT_NAME.Notify, "Not enough player!", "Danger");
    else if (this.room.getMembers().some((c) => !(c.getState() instanceof InRoomState)))
      this.socket.emit(SERVER_EVENT_NAME.Notify, "Some players are not ready!", "Danger");
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
    this.socket.on(CLIENT_EVENT_NAME.FindGame, this.onStartGame);
    this.socket.on(CLIENT_EVENT_NAME.Kick, this.onKick);
  }

  public exit(): void {
    super.exit();
    this.socket.off(CLIENT_EVENT_NAME.FindGame, this.onStartGame);
    this.socket.off(CLIENT_EVENT_NAME.Kick, this.onKick);
  }
}

export default RoomOwnerState;
