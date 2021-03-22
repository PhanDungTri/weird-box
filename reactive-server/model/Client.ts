import { Socket } from "socket.io";

export type Client = {
  id: string;
  socket: Socket;
  name: string;
};

export const createClient = (socket: Socket, name = "player"): Client => ({
  id: socket.id,
  socket,
  name,
});
