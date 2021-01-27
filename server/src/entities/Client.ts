/* eslint-disable @typescript-eslint/no-explicit-any */
import { Socket } from "socket.io";
import { IClient } from "../../../shared/src/interfaces/Client";
import SOCKET_EVENT from "../../../shared/src/SocketEvent";
import Server from "./Server";

class Client {
  public readonly id: string;

  constructor(private socket: Socket, private server: Server, public name = "player") {
    this.id = this.socket.id;
  }

  public run(): void {
    this.socket.emit(SOCKET_EVENT.Connected);
    this.socket.on(SOCKET_EVENT.FindGame, () => this.server.enqueueClient(this));
    this.socket.on("disconnect", () => console.log("Client left: " + this.id));
  }

  public on(event: SOCKET_EVENT, listener: (...args: any[]) => void): void {
    this.socket.on(event, listener);
  }

  public off(event: SOCKET_EVENT): void {
    this.socket.removeAllListeners(event);
  }

  public send(event: SOCKET_EVENT, data: unknown, wait = 0): void {
    if (wait > 0) setTimeout(() => this.socket.emit(event, data), wait);
    this.socket.emit(event, data);
  }

  public toJsonData(): IClient {
    return {
      id: this.id,
      name: this.name,
    };
  }
}

export default Client;
