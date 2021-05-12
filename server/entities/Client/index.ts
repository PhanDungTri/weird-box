import { ClientInfo, ClientSocket } from "../../../shared/@types";
import ClientState from "./ClientState";
import IdleState from "./IdleState";

class Client {
  private state: ClientState = new IdleState(this);
  private savedState: ClientState | null = null;

  constructor(private socket: ClientSocket, public name = "player") {}

  public getId(): string {
    return this.socket.id;
  }

  public getSocket(): ClientSocket {
    return this.socket;
  }

  public getInfo(): ClientInfo {
    return {
      id: this.getId(),
      name: this.name,
    };
  }

  public changeState(state: ClientState, save = false): void {
    this.state.exit();
    if (save) this.savedState = state;
    this.state = state;
    state.enter();
  }

  public changeToSavedState(): void {
    if (this.savedState) this.changeState(this.savedState);
    else throw new Error("Null saved state");
  }
}

export default Client;
