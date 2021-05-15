import ClientState from ".";
import Client from "..";
import { CLIENT_EVENT_NAME } from "../../../../shared/constants";
import ReadyChecker from "../../ReadyChecker";

class ReadyCheckState extends ClientState {
  private onFail: () => void;
  private onConfirm: (ready: boolean) => void;

  constructor(client: Client, private checker: ReadyChecker) {
    super(client);

    this.onFail = this.confirm.bind(this, false);
    this.onConfirm = this.confirm.bind(this);

    this.socket.on(CLIENT_EVENT_NAME.ReadyConfirm, this.onConfirm);
    this.socket.on("disconnect", this.onFail);
  }

  private confirm(ready: boolean) {
    this.socket.off(CLIENT_EVENT_NAME.ReadyConfirm, this.onConfirm);

    if (ready) this.checker.ready(this.client);
    else this.checker.fail(this.client);
  }

  public exit(): void {
    this.socket.off(CLIENT_EVENT_NAME.ReadyConfirm, this.onConfirm);
    this.socket.off("disconnect", this.onFail);
  }
}

export default ReadyCheckState;
