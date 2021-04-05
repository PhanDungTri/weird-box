import { SOCKET_EVENT } from "../../../shared/constants";
import waitFor from "../../utilities/waitFor";
import Card from "../Card";
import Client from "../Client";
import Game from "../Game";
import Spell from "../Spell";
import SpellManager from "./SpellManager";

class Player {
  private cards: Card[] = [];
  private spellManager;
  private hitPoint: number;
  private shouldPlayCard = false;

  constructor(private client: Client, private game: Game) {
    this.hitPoint = this.game.getMaxHP();
    this.spellManager = new SpellManager(this, this.game.sendToAll.bind(this.game));

    client.on(SOCKET_EVENT.PlayCard, this.playCard.bind(this));
    client.on(SOCKET_EVENT.Ready, this.ready.bind(this));
    client.on(SOCKET_EVENT.Disconnect, this.leaveGame.bind(this));
    client.once(SOCKET_EVENT.LeaveGame, this.leaveGame.bind(this));
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

  private playCard(id: string, ack: (id: string) => void): void {
    const card = this.getCardById(id);

    if (this.shouldPlayCard && this.game.getCurrentPlayer() === this && card) {
      this.shouldPlayCard = false;
      ack(id);
      this.game.consumeCard(card);
    } else {
      this.getClient().emit(SOCKET_EVENT.Error, "Not your turn");
    }

    // TODO validate card and check if player is in any game.
    // TODO check if player is eliminated
  }

  private ready(): void {
    this.game.checkReady();
    this.client.off(SOCKET_EVENT.Ready);
  }

  public startTurn(): void {
    this.shouldPlayCard = true;
    this.getClient().emit(SOCKET_EVENT.Info, "It's your turn!");
  }

  public async receiveCards(...cards: Card[]): Promise<void> {
    this.cards.push(...cards);
    this.client.emit(SOCKET_EVENT.TakeCard, cards);
    await waitFor(600);
  }

  public async changeHitPoint(difference: number): Promise<void> {
    this.hitPoint += difference;

    if (this.hitPoint <= 0) {
      this.hitPoint = 0;
      this.cards = [];
    } else if (this.hitPoint > 100) this.hitPoint = 100;

    await this.game.sendToAll(SOCKET_EVENT.HitPointChanged, {
      target: this.getClient().id,
      hp: this.hitPoint,
    });
  }

  public async takeSpell(spell: Spell): Promise<void> {
    await this.spellManager.takeSpell(spell);
  }

  public leaveGame(): void {
    this.client.off(SOCKET_EVENT.PlayCard);
    this.game.removePlayer(this);
  }
}

export default Player;
