import Game from "./Game";
import { IChangeHitPoint } from "../../../shared/src/interfaces/HitPoint";
import SOCKET_EVENT from "../../../shared/src/socketEvent";

class GameCommunicator {
  public readonly dispatchChangeHitPoint: (payload: IChangeHitPoint) => void;

  constructor(private game: Game) {
    this.dispatchChangeHitPoint = this.debounceChangeHitPoint();
  }

  private debounceChangeHitPoint(): (payload: IChangeHitPoint) => void {
    let timeout: NodeJS.Timeout;
    let data: IChangeHitPoint[] = [];

    return (payload: IChangeHitPoint): void => {
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
