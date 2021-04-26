import { ClientInfo, ClientSocket } from "../../shared/@types";
import { CLIENT_EVENT_NAME, SERVER_EVENT_NAME } from "../../shared/constants";
import Lobby from "./GameMatcher/Lobby";
import Room from "./Room";
import Server from "./Server";

class Client {
  public readonly id: string;
  private room: Room | undefined;
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

  public run(): void {
    this.socket.on(CLIENT_EVENT_NAME.CreateRoom, () => {
      if (!this.room) {
        this.room = new Room(this);
        Server.getInstance().addRoom(this.room);
        this.socket.removeAllListeners(CLIENT_EVENT_NAME.FindGame);
        this.socket.on(CLIENT_EVENT_NAME.FindGame, () => {
          new Lobby();
        });
      }
    });

    this.socket.on(CLIENT_EVENT_NAME.JoinRoom, (id: string) => {
      const room = Server.getInstance().getRoom(id);

      if (room) {
        try {
          room.add(this);
          this.room = room;
          this.socket.removeAllListeners(CLIENT_EVENT_NAME.FindGame);
        } catch (e) {
          this.socket.emit(SERVER_EVENT_NAME.Notify, e.message, "Danger");
        }
      } else this.socket.emit(SERVER_EVENT_NAME.Notify, "Not found room!", "Danger");
    });

    this.socket.on(CLIENT_EVENT_NAME.Rename, (name) => {
      this.name = name;
    });

    this.socket.on(CLIENT_EVENT_NAME.FindGame, () => {
      this.server.enqueueClient(this);
    });

    this.socket.on("disconnect", () => {
      this.server.disconnectClient(this);
      console.log("Client left: " + this.id);
    });
  }
}

export default Client;
