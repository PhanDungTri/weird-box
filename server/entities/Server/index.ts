import { Server as SocketServer } from "socket.io";
import { GameSocket } from "../../../shared/@types";
import Client from "../Client";
import FindingState from "../Client/State/FindingState";
import IdleState from "../Client/State/IdleState";
import GameMatcher from "./GameMatcher";
import Room from "../Room";

class Server {
  public static port = 3000;
  private static instance: Server;
  private rooms: Room[] = [];
  private gameMatcher = new GameMatcher();
  private socketServer: GameSocket = new SocketServer(Server.port, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  private constructor() {
    return;
  }

  public static getInstance(): Server {
    if (!Server.instance) Server.instance = new Server();
    return Server.instance;
  }

  public run(): void {
    console.info("Server started on port " + Server.port);

    this.socketServer.on("connect", (socket) => {
      new Client(socket);
      console.log("Client connected: " + socket.id);
      socket.on("disconnect", () => console.log("Client left: " + socket.id));
    });
  }

  public enqueueClient(client: Client): void {
    this.gameMatcher.add(client);
    client.changeState(new FindingState(client), true);
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
