import { Server as SocketServer, Socket } from "socket.io";
import Client from "./Client";
import GameFinder from "./GameFinder";

class Server {
  private onlineClients: Client[] = [];
  private gameFinder = new GameFinder();
  private socketServer: SocketServer = new SocketServer(this.port, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  constructor(private port = 3000) {}

  public run(): void {
    console.info("Server started on port " + this.port);

    this.socketServer.on("connection", (socket: Socket) => {
      const client = new Client(socket, this);

      console.log("Client connected: " + client.getId());
      this.onlineClients.push(client);
      client.run();
    });
  }

  public enqueueClient(client: Client): void {
    this.gameFinder.addClient(client);
  }
}

export default Server;
