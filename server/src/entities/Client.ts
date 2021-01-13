/* eslint-disable @typescript-eslint/no-explicit-any */
import { Socket } from "socket.io";
import SOCKET_EVENT from "../../../shared/src/SocketEvent";
import Server from "./Server";

class Client {
  constructor(private socket: Socket, private server: Server) {}

  public getId(): string {
    return this.socket.id;
  }

  public run(): void {
    this.socket.emit(SOCKET_EVENT.Connected);
    this.socket.on(SOCKET_EVENT.FindGame, () => this.server.enqueueClient(this));
    this.socket.on("disconnect", () => console.log("Client left: " + this.getId()));
  }

  public on(event: SOCKET_EVENT, listener: (...args: any[]) => void): void {
    this.socket.on(event, listener);
  }

  public send(event: SOCKET_EVENT, data: unknown, wait = 0): void {
    if (wait > 0) setTimeout(() => this.socket.emit(event, data), wait);
    this.socket.emit(event, data);
  }
}

export default Client;
