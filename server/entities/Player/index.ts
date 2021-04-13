import { CLIENT_EVENT_NAME, SERVER_EVENT_NAME } from "../../../shared/@types";
import Card from "../Card";
import Client from "../Client";
import Game from "../Game";
import Spell from "../Spell";
import SpellManager from "./SpellManager";

class Player {
  public isEliminated = false;
  private cards: Card[] = [];
  private spellManager;
  private hitPoint: number;

  constructor(private client: Client, private game: Game) {
    this.hitPoint = this.game.maxHP;
    this.spellManager = new SpellManager(this, this.game.broadcast.bind(this.game));
    this.client.getSocket().once("disconnect", this.leaveGame.bind(this));
    this.client.getSocket().once(CLIENT_EVENT_NAME.LeaveGame, this.leaveGame.bind(this));
  }

  public getCardById(id: string): Card | undefined {
    return this.cards.find((c) => c.id === id);
  }

  public getClient(): Client {
    return this.client;
  }

  public getHitPoint(): number {
    return this.hitPoint;
  }

  public async update(): Promise<void> {
    await this.spellManager.triggerPendingDebuffs();
  }

  public discardCard(id: string): void {
    this.cards = this.cards.filter((c) => c.id !== id);
  }

  public takeCards(...cards: Card[]): void {
    this.cards.push(...cards);
    this.client.getSocket().emit(
      SERVER_EVENT_NAME.GetCards,
      cards.map((c) => ({ id: c.id, power: c.getPower(), spell: c.getSpell() }))
    );
  }

  public changeHitPoint(difference: number): void {
    this.hitPoint += difference;

    if (this.hitPoint <= 0) this.hitPoint = 0;
    else if (this.hitPoint > 100) this.hitPoint = 100;

    this.game.broadcast(SERVER_EVENT_NAME.HitPointChanged, this.client.id, this.hitPoint);
  }

  public async takeSpell(spell: Spell): Promise<void> {
    await this.spellManager.takeSpell(spell);
  }

  public leaveGame(): void {
    this.client.getSocket().removeAllListeners(CLIENT_EVENT_NAME.PlayCard);
    this.game.eliminatePlayer(this);
  }
}

export default Player;
