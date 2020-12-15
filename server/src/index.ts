import express from "express";
import { createServer as createHttpServer } from "http";
import { Server as SocketServer, Socket } from "socket.io";
import Game from "./entities/Game";
import Player from "./entities/Player";

const expressServer = express();
const httpServer = createHttpServer(expressServer);
const socketServer = new SocketServer(httpServer, {
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

httpServer.listen(3000, () => {
  console.log("Server is started on port 3000");
});
