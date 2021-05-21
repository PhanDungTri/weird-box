import Server from "./entities/Server";
import dotenv from "dotenv";

dotenv.config();
Server.port = parseInt(process.env.HOST_PORT || "3000");
Server.getInstance().run();
