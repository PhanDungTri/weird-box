import Client from "..";
import ClientDerived from "../ClientDerived";

abstract class ClientState extends ClientDerived {
  constructor(client: Client) {
    super(client);
  }

  public exit(): void {
    return;
  }

  public enter(): void {
    return;
  }
}

export default ClientState;
