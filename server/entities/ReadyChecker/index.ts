import { SERVER_EVENT_NAME } from "../../../shared/constants";
import Client from "../Client";
import FindingState from "../Client/State/FindingState";
import IdleState from "../Client/State/IdleState";
import ReadyCheckState from "../Client/State/ReadyCheckState";
import Room from "../Room";
import Server from "../Server";

const DEFAULT_WAIT_TIME = 15000;

abstract class ReadyChecker {
  private passes: Client[] = [];
  private failures: Client[] = [];
  private timeout: NodeJS.Timeout;

  constructor(protected clients: Client[], protected room?: Room) {
    if (this.room) this.room.isInGame = true;
    this.clients.forEach((c) => c.changeState(new ReadyCheckState(c, this)));
    this.timeout = setTimeout(this.onUnqualified.bind(this), DEFAULT_WAIT_TIME);
  }

  private onResponse() {
    if (this.passes.length === this.clients.length) {
      clearTimeout(this.timeout);
      this.onQualify();
    } else if (this.passes.length + this.failures.length === this.clients.length) {
      clearTimeout(this.timeout);
      this.onUnqualified();
    }
  }

  private onUnqualified(): void {
    if (this.room) this.room.isInGame = true;
    this.clients.forEach((c) => {
      c.getSocket().emit(SERVER_EVENT_NAME.UpdateGameMatchingStatus, "Canceled");
      c.getSocket().emit(SERVER_EVENT_NAME.Notify, "notiFailMatch", "Warning");

      if (this.room) this.room.back(c);
      else if (this.passes.includes(c)) {
        Server.getInstance().enqueueClient(c);
        c.changeState(new FindingState(c));
      } else c.changeState(new IdleState(c));
    });
  }

  protected abstract onQualify(): void;

  public ready(client: Client): void {
    this.passes.push(client);
    this.onResponse();
  }

  public fail(client: Client): void {
    this.passes = this.passes.filter((c) => c !== client);
    this.failures.push(client);
    this.onResponse();
  }
}

export default ReadyChecker;
