import ClientState from ".";
import Client from "..";
import { CLIENT_EVENT_NAME, SERVER_EVENT_NAME } from "../../../../shared/constants";
import Room from "../../Room";
import Server from "../../Server";

class IdleState extends ClientState {
  private onCreateRoom: () => void;
  private onJoinRoom: (id: string) => void;
  private onFindGame: () => void;
  private onRename: (name: string) => void;

  constructor(client: Client) {
    super(client);

    this.onCreateRoom = this.createRoom.bind(this);
    this.onJoinRoom = this.joinRoom.bind(this);
    this.onFindGame = Server.getInstance().enqueueClient.bind(Server.getInstance(), this.client);
    this.onRename = this.setName.bind(this);
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
    } else this.socket.emit(SERVER_EVENT_NAME.Notify, "Room not found!", "Danger");
  }

  private setName(name: string) {
    this.client.name = name;
    this.socket.emit(SERVER_EVENT_NAME.Notify, "Name changed!", "Safe");
  }

  public enter(): void {
    this.socket.on(CLIENT_EVENT_NAME.CreateRoom, this.onCreateRoom);
    this.socket.on(CLIENT_EVENT_NAME.JoinRoom, this.onJoinRoom);
    this.socket.on(CLIENT_EVENT_NAME.FindGame, this.onFindGame);
    this.socket.on(CLIENT_EVENT_NAME.Rename, this.onRename);
  }

  public exit(): void {
    this.socket.off(CLIENT_EVENT_NAME.CreateRoom, this.onCreateRoom);
    this.socket.off(CLIENT_EVENT_NAME.JoinRoom, this.onJoinRoom);
    this.socket.off(CLIENT_EVENT_NAME.FindGame, this.onFindGame);
    this.socket.off(CLIENT_EVENT_NAME.Rename, this.onRename);
  }
}

export default IdleState;
