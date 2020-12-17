import { Socket } from "socket.io";
import SOCKET_EVENT from "../../../shared/src/socketEvent";
import { PlayerInfo } from "../interfaces/PlayerInfo";
import Card from "./Card";
import Game from "./Game";

class Player {
  private cards: Card[] = [];
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

  public getInfo(): PlayerInfo {
    return {
      id: this.socket.id,
      name: this.name,
      hitPoint: this.hitPoint,
    };
  }

  private playCard(id: string): void {
    const card = this.getCardById(id);

    if (card && this.game) {
      if (this.game.getCurrentPlayer() === this) {
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

  public takeDamage(damage: number): void {
    this.hitPoint -= damage;
    if (this.hitPoint < 0) this.hitPoint = 0;

    if (this.game) {
      this.game.notifyAll(SOCKET_EVENT.HitPointChanged, {
        id: this.getId(),
        difference: -damage,
      });
    }
  }
}

export default Player;
