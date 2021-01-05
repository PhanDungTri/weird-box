import { IPlayer } from "../../../shared/src/interfaces/Player";
import SOCKET_EVENT from "../../../shared/src/socketEvent";
import Game from "./Game";

class GameCommunicator {
  public readonly dispatchChangeHitPoint: (payload: Omit<IPlayer, "name">) => void;

  constructor(private game: Game) {
    this.dispatchChangeHitPoint = this.debounceChangeHitPoint();
  }

  private debounceChangeHitPoint(): (payload: Omit<IPlayer, "name">) => void {
    let timeout: NodeJS.Timeout;
    let data: Omit<IPlayer, "name">[] = [];

    return (payload: Omit<IPlayer, "name">): void => {
      if (timeout) {
        clearTimeout(timeout);
      }

      data.push(payload);
      timeout = setTimeout((): void => {
        this.game.notifyAll(SOCKET_EVENT.HitPointChanged, data);
        data = [];
      }, 100);
    };
  }
}

export default GameCommunicator;
