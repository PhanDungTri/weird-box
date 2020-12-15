import { Socket } from "socket.io";
import { PlayerInfo } from "../interfaces/PlayerInfo";
import Card from "./Card";
import Game from "./Game";

class Player {
  private cards: Card[] = [];
  private game: Game | null = null;
  private name = "Name";
  private hitPoint = 0;

  constructor(private socket: Socket) {
    socket.on("play card", this.playCard.bind(this));
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
        this.response("play card ok");
      } else {
        this.response("error", "Not your turn");
      }
    }
  }

  public response(event: string, data?: unknown): void {
    this.socket.emit(event, data);
  }

  public takeCard(card: Card): void {
    this.cards.push(card);
    this.response("take card", card);
  }

  public takeDamage(damage: number): void {
    this.hitPoint -= damage;
    if (this.hitPoint < 0) this.hitPoint = 0;

    if (this.game) {
      this.game.notifyAll("player HP changed", {
        id: this.getId(),
        difference: -damage,
      });
    }
  }
}

export default Player;
