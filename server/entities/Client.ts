import { ClientInfo, ClientSocket } from "../../shared/@types";
import { CLIENT_EVENT_NAME, SERVER_EVENT_NAME } from "../../shared/constants";
import Room from "./Room";
import Server from "./Server";

class Client {
  public readonly id: string;
  private server = Server.getInstance();

  constructor(private socket: ClientSocket, public name = "player") {
    const { id } = this.socket;
    this.id = id;
  }

  public getSocket(): ClientSocket {
    return this.socket;
  }

  public getInfo(): ClientInfo {
    return { id: this.id, name: this.name };
  }

  private inRoom() {
    this.socket.removeAllListeners(CLIENT_EVENT_NAME.FindGame);
    this.socket.removeAllListeners(CLIENT_EVENT_NAME.Rename);
    this.socket.removeAllListeners(CLIENT_EVENT_NAME.JoinRoom);
    this.socket.removeAllListeners(CLIENT_EVENT_NAME.CreateRoom);
    this.socket.on(CLIENT_EVENT_NAME.LeaveRoom, this.leaveRoom.bind(this));
  }

  private outRoom() {
    this.socket.on(CLIENT_EVENT_NAME.CreateRoom, this.createRoom.bind(this));
    this.socket.on(CLIENT_EVENT_NAME.JoinRoom, this.joinRoom.bind(this));
    this.socket.on(CLIENT_EVENT_NAME.FindGame, this.joinMatchingQueue.bind(this));
    this.socket.on(CLIENT_EVENT_NAME.Rename, this.setName.bind(this));
  }

  private createRoom() {
    if (!Server.getInstance().getRoomHasClient(this)) {
      const room = new Room(this);
      Server.getInstance().addRoom(room);
      this.inRoom();
      this.socket.on(CLIENT_EVENT_NAME.FindGame, () => {
        if (room.getSize() <= 1) this.socket.emit(SERVER_EVENT_NAME.Notify, "Not enough player!", "Danger");
        else room.findGame();
      });
    }
  }

  private joinRoom(id: string) {
    const room = Server.getInstance().getRoom(id);

    if (room) {
      try {
        room.add(this);
        this.inRoom();
      } catch (e) {
        this.socket.emit(SERVER_EVENT_NAME.Notify, e.message, "Danger");
      }
    } else this.socket.emit(SERVER_EVENT_NAME.Notify, "Not found room!", "Danger");
  }

  private leaveRoom() {
    const room = Server.getInstance().getRoomHasClient(this);

    if (room) {
      room.remove(this);
      this.socket.removeAllListeners(CLIENT_EVENT_NAME.LeaveRoom);
      this.outRoom();
    }
  }

  private joinMatchingQueue() {
    this.server.enqueueClient(this);
  }

  private setName(name: string) {
    this.name = name;
  }

  public run(): void {
    this.outRoom();

    this.socket.on("disconnect", () => {
      this.server.disconnectClient(this);
      console.log("Client left: " + this.id);
    });
  }
}

export default Client;
