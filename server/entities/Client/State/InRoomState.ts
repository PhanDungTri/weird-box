import ClientState from ".";
import Client from "..";
import { CLIENT_EVENT_NAME, SERVER_EVENT_NAME } from "../../../../shared/constants";
import Room from "../../Room";

class InRoomState extends ClientState {
  constructor(client: Client, protected room: Room) {
    super(client);
    this.leaveRoom = this.leaveRoom.bind(this);
  }

  private leaveRoom() {
    this.room.remove(this.client);
  }

  public enter(): void {
    this.socket.on(CLIENT_EVENT_NAME.LeaveRoom, this.leaveRoom);
    this.socket.emit(SERVER_EVENT_NAME.GetRoomInfo, this.room.getInfo());
  }

  public exit(): void {
    this.socket.off(CLIENT_EVENT_NAME.LeaveRoom, this.leaveRoom);
  }
}

export default InRoomState;
