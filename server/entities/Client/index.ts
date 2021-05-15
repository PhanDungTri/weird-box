import { ClientSocket, ClientInfo } from "../../../shared/@types";
import ClientState from "./State";
import IdleState from "./State/IdleState";

class Client {
  private state: ClientState;
  private savedState!: ClientState;

  constructor(private socket: ClientSocket, public name = "player") {
    this.state = new IdleState(this);
    this.state.enter();
  }

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
