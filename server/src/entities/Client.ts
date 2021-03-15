/* eslint-disable @typescript-eslint/no-explicit-any */
import { Socket } from "socket.io";
import { SOCKET_EVENT } from "../../../shared/src/@enums";
import Server from "./Server";

class Client {
  public readonly id: string;

  constructor(private socket: Socket, private server: Server, public name = "player") {
    this.id = this.socket.id;
  }

  public run(): void {
    this.socket.emit(SOCKET_EVENT.Connected);
    this.socket.on(SOCKET_EVENT.FindGame, () => this.server.enqueueClient(this));

    this.socket.on(SOCKET_EVENT.Rename, (name: string, ack: (name: string) => void) => {
      this.rename(name);
      ack(name);
    });

    this.socket.on("disconnect", () => {
      this.server.disconnectClient(this);
      console.log("Client left: " + this.id);
    });
  }

  private rename(name: string): void {
    this.name = name;
  }

  public on(event: SOCKET_EVENT, listener: (...args: any[]) => void): void {
    this.socket.on(event, listener);
  }

  public once(event: SOCKET_EVENT, listener: (...args: any[]) => void): void {
    this.socket.once(event, listener);
  }

  public off(event: SOCKET_EVENT): void {
    this.socket.removeAllListeners(event);
  }

  public send(event: SOCKET_EVENT, data?: unknown): void {
    this.socket.emit(event, data);
  }
}

export default Client;
