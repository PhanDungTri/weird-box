import { ClientSocket, ClientInfo } from "../../../shared/@types";
import Server from "../Server";
import ClientState from "./State";
import IdleState from "./State/IdleState";

class Client {
  private state: ClientState;

  constructor(private socket: ClientSocket, public name = "player") {
    this.state = new IdleState(this);

    this.state.enter();
    this.socket.on("disconnect", this.onDisconnect.bind(this));
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

  public getState(): ClientState {
    return this.state;
  }

  private onDisconnect() {
    // because player is maybe in room while in game
    const room = Server.getInstance().getRoomHasClient(this);
    if (room) room.remove(this);
  }

  public changeState(state: ClientState): void {
    const oldState = this.state.constructor.name;
    const newState = state.constructor.name;
    console.log(`${this.getId()} changed state from ${oldState} to ${newState}`);
    this.state.exit();
    this.state = state;
    state.enter();
  }
}

export default Client;
