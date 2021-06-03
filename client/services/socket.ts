import { Socket, io } from "socket.io-client";
import { EventsFromClient, EventsFromServer } from "../../shared/@types";

const socket: Socket<EventsFromServer, EventsFromClient> = io(
  process.env.NODE_ENV === "development" ? `http://localhost:3000/` : "/",
  {
    reconnection: false,
    autoConnect: false,
  }
);

export default socket;
