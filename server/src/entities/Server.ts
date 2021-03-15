import { Server as SocketServer, Socket } from "socket.io";
import Client from "./Client";
import Game from "./Game";
import GameMatcher from "./GameMatcher";

class Server {
  private onlineClients: Client[] = [];
  private games: Game[] = [];
  private gameMatcher = new GameMatcher(this);
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

      console.log("Client connected: " + client.id);
      this.onlineClients.push(client);
      client.run();
    });
  }

  public addGame(game: Game): void {
    this.games.push(game);
  }

  public removeGame(game: Game): void {
    this.games = this.games.filter((g) => g !== game);
  }

  public enqueueClient(client: Client): void {
    this.gameMatcher.addClient(client);
  }

  public disconnectClient(client: Client): void {
    this.onlineClients = this.onlineClients.filter((c) => c !== client);
    this.gameMatcher.removeClient(client);
  }
}

export default Server;
