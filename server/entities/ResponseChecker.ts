import { CLIENT_EVENT_NAME, SERVER_EVENT_NAME } from "../../shared/@types";
import Client from "./Client";
import Server from "./Server";

const DEFAULT_WAIT_TIME = 30000;

class ResponseChecker {
  protected responses: Client[] = [];
  private timeout: NodeJS.Timeout;

  constructor(protected clients: Client[], waitTime = DEFAULT_WAIT_TIME) {
    this.clients.forEach((c) => c.once(CLIENT_EVENT_NAME.Ready, () => this.ready(c)));
    this.timeout = setTimeout(this.onTimeout.bind(this), waitTime);
  }

  protected onPass(): void {
    return;
  }

  protected ready(client: Client): void {
    this.responses.push(client);

    if (this.responses.length === this.clients.length) {
      clearTimeout(this.timeout);
      this.onPass();
    }
  }

  protected onTimeout(): void {
    this.clients.forEach((c) => {
      if (this.responses.includes(c)) Server.getInstance().enqueueClient(c);
      c.removeAllListener("ready");
      c.emit(SERVER_EVENT_NAME.UpdateGameMatcherStatus, "canceled");
    });
  }
}

export default ResponseChecker;
