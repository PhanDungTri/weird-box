import { Subscription, timer } from "rxjs";
import Client from "./Client";
import Server from "./Server";

const DEFAULT_WAIT_TIME = 30000;

class ResponseChecker {
  private timeoutSubscription: Subscription;
  protected responses: Client[] = [];

  constructor(protected clients: Client[], waitTime = DEFAULT_WAIT_TIME) {
    this.clients.forEach((c) => c.once("ready", () => this.ready(c)));
    this.timeoutSubscription = timer(waitTime).subscribe(this.timeout.bind(this));
  }

  protected onPass(): void {
    return;
  }

  protected ready(client: Client): void {
    this.responses.push(client);

    if (this.responses.length === this.clients.length) {
      this.timeoutSubscription.unsubscribe();
      this.onPass();
    }
  }

  protected timeout(): void {
    this.clients.forEach((c) => {
      if (this.responses.includes(c)) Server.getInstance().enqueueClient(c);
      c.removeAllListener("ready");
      c.emit("update game matcher status", "canceled");
    });
  }
}

export default ResponseChecker;
