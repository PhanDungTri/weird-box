import { Manager } from "socket.io-client";

const manager = new Manager(`ws://${process.env.HOST_ADDRESS}:${process.env.HOST_PORT}`);
const socket = manager.socket("/");

export default socket;
