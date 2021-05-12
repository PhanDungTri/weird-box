import { ClientSocket } from "../../../shared/@types";
import Client from ".";

abstract class ClientState {
  protected socket: ClientSocket;

  constructor(protected client: Client) {
    this.socket = client.getSocket();
  }

  public exit(): void {
    return;
  }

  public enter(): void {
    return;
  }
}

export default ClientState;
