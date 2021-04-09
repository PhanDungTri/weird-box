import { Server as SocketServer } from "socket.io";
import { GameSocket } from "../../shared/@types";
import Client from "./Client";
import GameMatcher from "./GameMatcher";

class Server {
  public static port = 3000;
  private static instance: Server;
  private gameMatcher = new GameMatcher();
  private socketServer: GameSocket = new SocketServer(Server.port, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance(): Server {
    if (!Server.instance) Server.instance = new Server();
    return Server.instance;
  }

  public run(): void {
    console.info("Server started on port " + Server.port);

    this.socketServer.on("connect", (socket) => {
      const client = new Client(socket);

      console.log("Client connected: " + client.id);
      client.run();
    });
  }

  public enqueueClient(client: Client): void {
    this.gameMatcher.enqueue(client);
  }

  public disconnectClient(client: Client): void {
    this.gameMatcher.dequeue(client);
  }
}

export default Server;
