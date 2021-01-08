import { Server as SocketServer, Socket } from "socket.io";
import Client from "./Client";

class Server {
  private onlineClients: Client[] = [];
  private socketServer: SocketServer = new SocketServer(this.port, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  constructor(private port = 3000) {}

  public run(): void {
    this.socketServer.on("connection", (socket: Socket) => {
      const client = new Client(socket, this);
      this.onlineClients.push(client);
    });
  }
}

export default Server;
