import ClientState from ".";
import Client from "..";
import { CLIENT_EVENT_NAME, SERVER_EVENT_NAME } from "../../../../shared/constants";
import Room from "../../Room";
import Server from "../../Server";

class IdleState extends ClientState {
  private findGame: () => void;

  constructor(client: Client) {
    super(client);

    this.createRoom = this.createRoom.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
    this.findGame = Server.getInstance().enqueueClient.bind(Server.getInstance(), this.client);
    this.setName = this.setName.bind(this);
  }

  private createRoom() {
    const room = new Room(this.client);
    Server.getInstance().addRoom(room);
  }

  private joinRoom(id: string) {
    const room = Server.getInstance().getRoom(id);

    if (room) {
      try {
        room.add(this.client);
      } catch (e) {
        this.socket.emit(SERVER_EVENT_NAME.Notify, e.message, "Danger");
      }
    } else this.socket.emit(SERVER_EVENT_NAME.Notify, "errRoomNotFound", "Danger");
  }

  private setName(name: string) {
    this.client.name = name;
    this.socket.emit(SERVER_EVENT_NAME.Notify, "notiNameChanged", "Safe");
  }

  public enter(): void {
    this.socket.on(CLIENT_EVENT_NAME.CreateRoom, this.createRoom);
    this.socket.on(CLIENT_EVENT_NAME.JoinRoom, this.joinRoom);
    this.socket.on(CLIENT_EVENT_NAME.FindGame, this.findGame);
    this.socket.on(CLIENT_EVENT_NAME.Rename, this.setName);
  }

  public exit(): void {
    this.socket.off(CLIENT_EVENT_NAME.CreateRoom, this.createRoom);
    this.socket.off(CLIENT_EVENT_NAME.JoinRoom, this.joinRoom);
    this.socket.off(CLIENT_EVENT_NAME.FindGame, this.findGame);
    this.socket.off(CLIENT_EVENT_NAME.Rename, this.setName);
  }
}

export default IdleState;
