import Server from "./entities/Server";
import { config as dotenvConfig } from "dotenv";

dotenvConfig();
Server.port = parseInt(process.env.PORT || "3000");
Server.getInstance();
