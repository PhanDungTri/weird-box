import { CLIENT_EVENT_NAME, SERVER_EVENT_NAME } from "../../shared/@types";
import Client from "./Client";
import Server from "./Server";

const DEFAULT_WAIT_TIME = 30000;

class Qualifier {
  protected passes: Client[] = [];
  protected failures: Client[] = [];
  private timeout: NodeJS.Timeout;

  constructor(protected clients: Client[], waitTime = DEFAULT_WAIT_TIME) {
    this.clients.forEach((c) => {
      const onReady = () => {
        this.ready(c);
        c.getSocket().off("disconnect", onFail);
      };

      const onFail = () => {
        this.fail(c);
        c.getSocket().off(CLIENT_EVENT_NAME.Ready, onReady);
      };

      c.getSocket().once(CLIENT_EVENT_NAME.Ready, onReady);
      c.getSocket().on("disconnect", onFail);
    });
    this.timeout = setTimeout(this.onUnqualified.bind(this), waitTime);
  }

  private onResponse() {
    if (this.passes.length === this.clients.length) {
      clearTimeout(this.timeout);
      this.onQualified();
    } else if (this.passes.length + this.failures.length === this.clients.length) {
      clearTimeout(this.timeout);
      this.onUnqualified();
    }
  }

  protected onQualified(): void {
    return;
  }

  protected ready(client: Client): void {
    this.passes.push(client);
    this.onResponse();
  }

  protected fail(client: Client): void {
    this.passes.filter((c) => c !== client);
    this.failures.push(client);
    this.onResponse();
  }

  protected onUnqualified(): void {
    this.clients.forEach((c) => {
      c.getSocket().removeAllListeners(CLIENT_EVENT_NAME.Ready);
      c.getSocket().emit(SERVER_EVENT_NAME.UpdateGameMatchingStatus, "canceled");
      if (this.passes.includes(c)) Server.getInstance().enqueueClient(c);
    });
  }
}

export default Qualifier;
