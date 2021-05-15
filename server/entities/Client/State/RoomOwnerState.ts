import Client from "..";
import { SERVER_EVENT_NAME, CLIENT_EVENT_NAME } from "../../../../shared/constants";
import MatchingChecker from "../../ReadyChecker/MatchingChecker";
import Room from "../../Room";
import InRoomState from "./InRoomState";

class RoomOwnerState extends InRoomState {
  private onTransferOwnership: (id: string) => void;
  private onStartGame: () => void;

  constructor(client: Client, room: Room) {
    super(client, room);

    this.onTransferOwnership = this.transferOwnership.bind(this);
    this.onStartGame = this.startGame.bind(this);
  }

  private transferOwnership(id: string) {
    if (id === this.id) this.socket.emit(SERVER_EVENT_NAME.Notify, "You are already the owner!", "Warning");
    else
      try {
        this.room.changeOwner(id);
      } catch (e) {
        this.socket.emit(SERVER_EVENT_NAME.Notify, e.message, "Danger");
      }
  }

  private startGame() {
    if (this.room.getSize() <= 1) this.socket.emit(SERVER_EVENT_NAME.Notify, "Not enough player!", "Danger");
    else new MatchingChecker(this.room.getMembers(), this.room);
  }

  public enter(): void {
    super.enter();
    this.socket.on(CLIENT_EVENT_NAME.TransferOwnership, this.onTransferOwnership);
    this.socket.on(CLIENT_EVENT_NAME.FindGame, this.onStartGame);
  }

  public exit(): void {
    super.exit();
    this.socket.off(CLIENT_EVENT_NAME.TransferOwnership, this.onTransferOwnership);
    this.socket.off(CLIENT_EVENT_NAME.FindGame, this.onStartGame);
  }
}

export default RoomOwnerState;
