import { Socket } from "socket.io";
import { IEffectEvent } from "../../../shared/src/interfaces/Effect";
import { IPlayer } from "../../../shared/src/interfaces/Player";
import SOCKET_EVENT from "../../../shared/src/socketEvent";
import Card from "./Card";
import Effect from "./effects/Effect";
import OverTimeEffect from "./effects/OverTimeEffect";
import Game from "./Game";

class Player {
  private cards: Card[] = [];
  private effects: OverTimeEffect[] = [];
  private game: Game | null = null;
  private name = "Name";
  private hitPoint = 0;

  constructor(private socket: Socket) {
    socket.on(SOCKET_EVENT.PlayCard, this.playCard.bind(this));
  }

  public setGame(game: Game): void {
    this.game = game;
    this.hitPoint = this.game.getMaxHP();
  }

  public getCards(): Card[] {
    return this.cards;
  }

  public getCardById(id: string): Card | undefined {
    return this.cards.find((c) => c.id === id);
  }

  public getId(): string {
    return this.socket.id;
  }

  private playCard(id: string): void {
    const card = this.getCardById(id);

    if (card) {
      if (this.game?.getCurrentPlayer() === this) {
        this.game.consumeCard(card);
      } else {
        this.response(SOCKET_EVENT.Error, "Not your turn");
      }
    }

    // TODO validate card and check if player is in any game.
  }

  public response(event: string, data?: unknown, wait = 0): void {
    if (wait > 0) setTimeout(() => this.socket.emit(event, data), wait);
    else this.socket.emit(event, data);
  }

  public takeCards(...cards: Card[]): void {
    this.cards.push(...cards);
    this.response(SOCKET_EVENT.TakeCard, cards);
  }

  public changeHitPoint(difference: number): void {
    this.hitPoint += difference;
    if (this.hitPoint < 0) this.hitPoint = 0;
    else if (this.hitPoint > 100) this.hitPoint = 100;

    this.game?.communicator.dispatchChangeHitPoint(this.toJsonData());
  }

  public takeEffect(effect: Effect): void {
    if (effect instanceof OverTimeEffect) {
      this.effects.push(effect);
    }

    const data: IEffectEvent = {
      target: this.getId(),
      effect: effect.toJsonData(),
    };

    this.game?.notifyAll(SOCKET_EVENT.TakeEffect, data);
  }

  public removeEffect(effect: OverTimeEffect): void {
    this.effects = this.effects.filter((eff) => eff !== effect);
  }

  public tickEffects(): void {
    this.effects.forEach((eff) => {
      eff.tick();

      const data: IEffectEvent = {
        target: this.getId(),
        effect: eff.toJsonData(),
      };

      this.game?.notifyAll(SOCKET_EVENT.TickEffect, data);
    });
  }

  public sanitize(): void {
    this.effects = [];
    this.game?.notifyAll(SOCKET_EVENT.Sanitize, this.getId());
  }

  public toJsonData(): IPlayer {
    return {
      id: this.getId(),
      name: this.name,
      hp: this.hitPoint,
    };
  }
}

export default Player;
