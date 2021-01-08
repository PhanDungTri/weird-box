import { Server as SocketServer, Socket } from "socket.io";
import Game from "./entities/Game";
import Player from "./entities/Player";

const socketServer = new SocketServer(3000, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const exampleGame = new Game();

socketServer.on("connection", (socket: Socket) => {
  console.log(`${socket.id} connected`);

  const player = new Player(socket);
  exampleGame.addPlayer(player);

  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected`);
  });
});
