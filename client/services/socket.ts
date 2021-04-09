import { Socket, io } from "socket.io-client";
import { EventsFromClient, EventsFromServer } from "../../shared/@types";

const socket: Socket<EventsFromServer, EventsFromClient> = io(
  `http://${process.env.HOST_ADDRESS}:${process.env.HOST_PORT}/`
);

export default socket;
