/* eslint-disable @typescript-eslint/no-explicit-any */
import { Socket } from "socket.io";
import SOCKET_EVENT from "../../../shared/src/socketEvent";
import Server from "./Server";

class Client {
  constructor(private socket: Socket, private server: Server) {}

  public on(event: SOCKET_EVENT, listener: (...args: any[]) => void): void {
    this.socket.on(event, listener);
  }

  public send(event: SOCKET_EVENT, ...args: any[]): void {
    this.socket.emit(event, args);
  }

  public getId(): string {
    return this.socket.id;
  }
}

export default Client;
