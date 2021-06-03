import express from "express";
import { createServer } from "http";
import { Server as SocketServer } from "socket.io";
import Client from "../Client";
import FindingState from "../Client/State/FindingState";
import IdleState from "../Client/State/IdleState";
import Room from "../Room";
import GameMatcher from "./GameMatcher";
import path from "path";

class Server {
  public static port = 3000;
  private static instance: Server;
  private rooms: Room[] = [];
  private gameMatcher = new GameMatcher();

  private constructor() {
    const app = express();
    const httpServer = createServer(app);
    const socketServer = new SocketServer(httpServer, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true,
      },
    });

    app.use(express.static(path.join(__dirname, "..", "..", "..", "dist")));
    app.get("/", (_, res) => res.sendFile(path.join(__dirname, "..", "..", "..", "build", "index.html")));

    socketServer.on("connect", (socket) => {
      new Client(socket);
      console.log("Client connected: " + socket.id);
      socket.on("disconnect", () => console.log("Client left: " + socket.id));
    });

    httpServer.listen(Server.port, () => console.info("Server started on port " + Server.port));
  }

  public static getInstance(): Server {
    if (!Server.instance) Server.instance = new Server();
    return Server.instance;
  }

  public enqueueClient(client: Client): void {
    client.changeState(new FindingState(client));
    this.gameMatcher.add(client);
  }

  public dequeueClient(client: Client): void {
    this.gameMatcher.remove(client);
    client.changeState(new IdleState(client));
  }

  public addRoom(room: Room): void {
    this.rooms.push(room);
  }

  public removeRoom(room: Room): void {
    this.rooms = this.rooms.filter((r) => r !== room);
  }

  public getRoom(id: string): Room | undefined {
    return this.rooms.find((r) => r.id === id);
  }

  public getRoomHasClient(client: Client): Room | undefined {
    return this.rooms.find((r) => r.getMembers().includes(client));
  }
}

export default Server;
