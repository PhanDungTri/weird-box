import dotenv from "dotenv";
import { fromEvent, of } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { Server as SocketServer, Socket } from "socket.io";
import { createClient } from "./model/Client";

dotenv.config();
const port = parseInt(process.env.PORT) || 3000;
const server = new SocketServer(port, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const io$ = of(server);

const connection$ = io$.pipe(
  switchMap((io) => fromEvent<Socket>(io, "connection").pipe(map((socket) => createClient(socket))))
);

const findGame$ = connection$.pipe(merge);

connection$.subscribe((client) => console.info(`Client ${client.id} connected`));

console.info(`Server is listening on port ${port}`);
