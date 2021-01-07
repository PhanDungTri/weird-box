import { createState } from "@hookstate/core";
import { Manager } from "socket.io-client";

const manager = new Manager("ws://192.168.1.195:3000");
const socket = manager.socket("/");

export default socket;
