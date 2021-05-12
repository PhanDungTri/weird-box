import { SERVER_EVENT_NAME } from "../../shared/constants";
import Client from "./Client";
import IdleState from "./Client/IdleState";
import ReadyCheckState from "./Client/ReadyCheckState";
import Server from "./Server";

const DEFAULT_WAIT_TIME = 15000;

class ReadyChecker {
  protected passes: Client[] = [];
  protected failures: Client[] = [];
  private timeout: NodeJS.Timeout;

  constructor(
    protected clients: Client[],
    private onQualified: (clients: Client[], inRoom?: boolean) => void,
    protected inRoom = false
  ) {
    this.clients.forEach((c) => c.changeState(new ReadyCheckState(c, this)));
    this.timeout = setTimeout(this.onUnqualified.bind(this), DEFAULT_WAIT_TIME);
  }

  private onResponse() {
    if (this.passes.length === this.clients.length) {
      clearTimeout(this.timeout);
      this.onQualified(this.clients, this.inRoom);
    } else if (this.passes.length + this.failures.length === this.clients.length) {
      clearTimeout(this.timeout);
      this.onUnqualified();
    }
  }

  public ready(client: Client): void {
    this.passes.push(client);
    this.onResponse();
  }

  public fail(client: Client): void {
    this.passes = this.passes.filter((c) => c !== client);
    this.failures.push(client);
    this.onResponse();
  }

  protected onUnqualified(): void {
    this.clients.forEach((c) => {
      c.getSocket().emit(SERVER_EVENT_NAME.UpdateGameMatchingStatus, "canceled");
      c.getSocket().emit(SERVER_EVENT_NAME.Notify, "Failed to match! Return to previous situation!", "Warning");

      // to in room state or owner room state
      if (this.inRoom) c.changeToSavedState();
      else if (this.passes.includes(c)) {
        Server.getInstance().enqueueClient(c);
        c.changeToSavedState(); // to finding state
      } else c.changeState(new IdleState(c));
    });
  }
}

export default ReadyChecker;
