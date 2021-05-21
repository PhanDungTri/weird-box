import { SERVER_EVENT_NAME } from "../../../shared/constants";
import Client from "../Client";
import Game from "../Game";
import ReadyChecker from ".";
import Room from "../Room";

class MatchingChecker extends ReadyChecker {
  constructor(clients: Client[], room?: Room) {
    super(clients, room);
    clients.forEach((c) => c.getSocket().emit(SERVER_EVENT_NAME.UpdateGameMatchingStatus, "Found"));
  }

  protected onQualify(): void {
    new Game(this.clients, this.room);
  }
}

export default MatchingChecker;
