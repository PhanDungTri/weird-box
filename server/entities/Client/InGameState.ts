import Client from ".";
import Player from "../Player";
import ClientState from "./ClientState";

class InGameState extends ClientState {
  constructor(client: Client, protected player: Player) {
    super(client);
  }
}
