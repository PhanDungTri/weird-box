/* eslint-disable @typescript-eslint/no-explicit-any */
import { ClientSocket } from "../../shared/@types";
import Server from "./Server";

class Client {
  private server = Server.getInstance();
  public readonly id: string;
  public readonly on: ClientSocket["on"];
  public readonly off: ClientSocket["off"];
  public readonly emit: ClientSocket["emit"];
  public readonly once: ClientSocket["once"];
  public readonly removeAllListener: ClientSocket["removeAllListeners"];

  constructor(socket: ClientSocket, public name = "player") {
    const { id, on, off, emit, once, removeAllListeners } = socket;
    this.id = id;
    this.on = on;
    this.off = off;
    this.emit = emit;
    this.once = once;
    this.removeAllListener = removeAllListeners;
  }

  public run(): void {
    this.on("find game", (name, cb) => {
      this.name = name;
      this.server.enqueueClient(this);
      cb(name);
    });

    this.on("disconnect", () => {
      this.server.disconnectClient(this);
      console.log("Client left: " + this.id);
    });
  }
}

export default Client;
