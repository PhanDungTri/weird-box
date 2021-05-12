import Client from ".";
import Player from "../Player";
import ClientState from "./ClientState";

class InTurnState extends ClientState {
  constructor(client: Client, private player: Player) {
    super(client);
  }
}
