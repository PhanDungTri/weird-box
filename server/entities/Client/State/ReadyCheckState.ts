import ClientState from ".";
import Client from "..";
import { CLIENT_EVENT_NAME } from "../../../../shared/constants";
import ReadyChecker from "../../ReadyChecker";

class ReadyCheckState extends ClientState {
  private fail: () => void;

  constructor(client: Client, private checker: ReadyChecker) {
    super(client);

    this.fail = this.confirm.bind(this, false);
    this.confirm = this.confirm.bind(this);
  }

  private confirm(ready: boolean) {
    this.socket.off(CLIENT_EVENT_NAME.ReadyConfirm, this.confirm);

    if (ready) this.checker.ready(this.client);
    else this.checker.fail(this.client);
  }

  public enter(): void {
    this.socket.on(CLIENT_EVENT_NAME.ReadyConfirm, this.confirm);
    this.socket.on("disconnect", this.fail);
  }

  public exit(): void {
    this.socket.off(CLIENT_EVENT_NAME.ReadyConfirm, this.confirm);
    this.socket.off("disconnect", this.fail);
  }
}

export default ReadyCheckState;
