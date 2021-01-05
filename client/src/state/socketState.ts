import { atom } from "recoil";
import { Manager, Socket } from "socket.io-client";

const manager = new Manager("ws://192.168.1.195:3000");
const socket = manager.socket("/");

const socketState = atom<Socket>({
  key: "socketState",
  default: socket,
});

export default socketState;
