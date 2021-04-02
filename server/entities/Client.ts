/* eslint-disable @typescript-eslint/no-explicit-any */
import { ClientSocket } from "../../shared/@types";
import { SOCKET_EVENT } from "../../shared/constants";
import Server from "./Server";

class Client {
  public readonly id: string;
  public readonly on: ClientSocket["on"];
  public readonly off: ClientSocket["off"];
  public readonly emit: ClientSocket["emit"];
  public readonly once: ClientSocket["once"];

  constructor(socket: ClientSocket, public name = "player") {
    const { id, on, off, emit, once } = socket;
    this.id = id;
    this.on = on;
    this.off = off;
    this.emit = emit;
    this.once = once;
  }

  public run(): void {
    this.on("find game", (name, cb) => {
      this.name = name;
      Server.getInstance().enqueueClient(this);
      cb(name);
    });

    this.socket.on(SOCKET_EVENT.Rename, (name: string, ack: (name: string) => void) => {
      this.rename(name);
      ack(name);
    });

    this.socket.on("disconnect", () => {
      this.server.disconnectClient(this);
      console.log("Client left: " + this.id);
    });
  }
}

export default Client;
