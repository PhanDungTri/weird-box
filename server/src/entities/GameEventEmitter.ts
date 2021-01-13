import { ISpell } from "../../../shared/src/interfaces/Spell";
import { IPlayer } from "../../../shared/src/interfaces/Player";
import SOCKET_EVENT from "../../../shared/src/SocketEvent";
import Game from "./Game";

class GameEventEmitter {
  public readonly dispatchChangeHitPoint: (payload: Omit<IPlayer, "name">) => void;
  public readonly dispatchTakeSpell: (payload: ISpell) => void;

  constructor(private game: Game) {
    this.dispatchChangeHitPoint = this.debounceChangeHitPoint();
    this.dispatchTakeSpell = this.debounceTakeSpell();
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
        this.game.sendToAll(SOCKET_EVENT.HitPointChanged, data);
        data = [];
      }, 100);
    };
  }

  private debounceTakeSpell(): (payload: ISpell) => void {
    let timeout: NodeJS.Timeout;
    let data: ISpell[] = [];

    return (payload: ISpell): void => {
      if (timeout) {
        clearTimeout(timeout);
      }

      data.push(payload);
      timeout = setTimeout((): void => {
        this.game.sendToAll(SOCKET_EVENT.TakeSpell, data);
        data = [];
      }, 100);
    };
  }
}

export default GameEventEmitter;
