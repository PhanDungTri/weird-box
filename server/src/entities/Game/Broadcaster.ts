import { IPassiveAction, ISpell } from "../../../../shared/src/interfaces/Spell";
import { IPlayer } from "../../../../shared/src/interfaces/Player";
import SOCKET_EVENT from "../../../../shared/src/SocketEvent";
import Game from ".";

type Debounce<T> = (payload: T) => void;

class Broadcaster {
  public readonly dispatchChangeHitPoint: Debounce<Omit<IPlayer, "name">>;
  public readonly dispatchTakeSpell: Debounce<ISpell>;
  public readonly dispatchTriggerPassive: Debounce<IPassiveAction>;

  constructor(private game: Game) {
    this.dispatchChangeHitPoint = this.createDebounce<Omit<IPlayer, "name">>(SOCKET_EVENT.HitPointChanged);
    this.dispatchTakeSpell = this.createDebounce<ISpell>(SOCKET_EVENT.TakeSpell);
    this.dispatchTriggerPassive = this.createDebounce<IPassiveAction>(SOCKET_EVENT.ActivatePassive);
  }

  private createDebounce<T>(event: SOCKET_EVENT): Debounce<T> {
    let timeout: NodeJS.Timeout;
    let data: T[] = [];

    return (payload: T): void => {
      if (timeout) clearTimeout(timeout);

      data.push(payload);
      timeout = setTimeout(() => {
        this.game.sendToAll(event, data);
        data = [];
      }, 100);
    };
  }
}

export default Broadcaster;
