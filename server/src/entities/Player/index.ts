import { IPlayer } from "../../../../shared/src/interfaces/Player";
import SOCKET_EVENT from "../../../../shared/src/SocketEvent";
import waitFor from "../../utilities/waitFor";
import Card from "../Card";
import Client from "../Client";
import Game from "../Game";
import SpellManager from "./SpellManager";
import Spell from "../Spell";

class Player {
  private cards: Card[] = [];
  private spellManager = new SpellManager();
  private hitPoint: number;

  constructor(private client: Client, private game: Game) {
    this.hitPoint = game.getMaxHP();
    client.on(SOCKET_EVENT.PlayCard, this.playCard.bind(this));
    client.on(SOCKET_EVENT.Ready, this.ready.bind(this));
    client.on(SOCKET_EVENT.LeaveGame, this.leaveGame.bind(this));
  }

  public getCards(): Card[] {
    return this.cards;
  }

  public getCardById(id: string): Card | undefined {
    return this.cards.find((c) => c.id === id);
  }

  public getClient(): Client {
    return this.client;
  }

  private playCard(id: string): void {
    const card = this.getCardById(id);

    if (card) {
      if (this.game.getCurrentPlayer() === this) {
        this.game.consumeCard(card);
      } else {
        this.getClient().send(SOCKET_EVENT.Error, "Not your turn");
      }
    }

    // TODO validate card and check if player is in any game.
  }

  private ready(): void {
    this.game.checkReady();
    this.client.off(SOCKET_EVENT.Ready);
  }

  public takeCards(...cards: Card[]): void {
    this.cards.push(...cards);
    this.getClient().send(SOCKET_EVENT.TakeCard, cards);
  }

  public changeHitPoint(difference: number): void {
    this.hitPoint += difference;

    if (this.hitPoint <= 0) {
      this.hitPoint = 0;
      this.game.eliminatePlayer(this);
      this.cards = [];
      this.purify();
    } else if (this.hitPoint > 100) this.hitPoint = 100;

    this.game.broadcaster.dispatchChangeHitPoint(this.toJsonData());
  }

  public takeSpell(spell: Spell): void {
    this.spellManager.takeSpell(spell);
    this.game.broadcaster.dispatchTakeSpell(spell.toJsonData());
  }

  public purify(): void {
    this.spellManager.purify();
    this.game.sendToAll(SOCKET_EVENT.Purify, this.client.id);
  }

  public async update(): Promise<void> {
    const debuffTrigger = this.spellManager.triggerDebuffs();
    let result = debuffTrigger.next();

    while (!result.done) {
      this.game.broadcaster.dispatchTakeSpell(result.value.toJsonData());
      await waitFor(700);
      result = debuffTrigger.next();
    }
  }

  public leaveGame(): void {
    this.game.removePlayer(this);
  }

  public toJsonData(): IPlayer {
    return {
      ...this.client.toJsonData(),
      hp: this.hitPoint,
    };
  }
}

export default Player;
