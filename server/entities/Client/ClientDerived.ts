import { ClientSocket } from "../../../shared/@types";
import Client from ".";

abstract class ClientDerived {
  public readonly socket: ClientSocket;
  public readonly id: string;

  constructor(protected client: Client) {
    this.socket = client.getSocket();
    this.id = client.getId();
  }
}

export default ClientDerived;
