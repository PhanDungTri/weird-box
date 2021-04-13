/* eslint-disable @typescript-eslint/no-explicit-any */
import { ClientSocket, CLIENT_EVENT_NAME } from "../../shared/@types";
import Server from "./Server";

class Client {
  private server = Server.getInstance();
  public readonly id: string;

  constructor(private socket: ClientSocket, public name = "player") {
    const { id } = this.socket;
    this.id = id;
  }

  public getSocket(): ClientSocket {
    return this.socket;
  }

  public run(): void {
    this.socket.on(CLIENT_EVENT_NAME.FindGame, (name) => {
      this.name = name;
      this.server.enqueueClient(this);
    });

    this.socket.on("disconnect", () => {
      this.server.disconnectClient(this);
      console.log("Client left: " + this.id);
    });
  }
}

export default Client;
