import Game from ".";
import { IPlayer } from "../../../../shared/src/interfaces/Player";
import { IPassiveAction, ISpell } from "../../../../shared/src/interfaces/Spell";
import SOCKET_EVENT from "../../../../shared/src/SocketEvent";

type Debounce<T> = (payload: T) => Promise<void>;

class Broadcaster {
  public readonly dispatchChangeHitPoint: Debounce<Omit<IPlayer, "name">>;
  public readonly dispatchTakeSpell: Debounce<ISpell>;
  public readonly dispatchTriggerPassive: Debounce<IPassiveAction>;

  constructor(private game: Game) {
    this.dispatchChangeHitPoint = this.createDebounce<Omit<IPlayer, "name">>(SOCKET_EVENT.HitPointChanged);
    this.dispatchTakeSpell = this.createDebounce<ISpell>(SOCKET_EVENT.TakeSpell, 600);
    this.dispatchTriggerPassive = this.createDebounce<IPassiveAction>(SOCKET_EVENT.ActivatePassive, 600);
  }

  private createDebounce<T>(event: SOCKET_EVENT, wait = 0): Debounce<T> {
    let timeout: NodeJS.Timeout;
    let data: T[] = [];

    return (payload: T): Promise<void> => {
      const promise = new Promise<void>((res) => {
        if (timeout) clearTimeout(timeout);

        data.push(payload);
        timeout = setTimeout(async () => {
          await this.game.sendToAll(event, data, wait);
          data = [];
          res();
        }, 100);
      });

      return promise;
    };
  }
}

export default Broadcaster;
