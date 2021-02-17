import { IPlayer } from "../../../shared/src/interfaces/Player";
import SOCKET_EVENT from "../../../shared/src/SocketEvent";
import waitFor from "../utilities/waitFor";
import Card from "./Card";
import Client from "./Client";
import Game from "./Game";
import Spell from "./Spell";
import PassiveSpell from "./Spell/PassiveSpell";
import Broadcaster from "./Game/Broadcaster";

class Player {
  private cards: Card[] = [];
  private debuffs: Spell[] = [];
  private talismans: PassiveSpell[] = [];
  private curses: PassiveSpell[] = [];
  private hitPoint: number;
  private shouldPlayCard = false;

  constructor(private client: Client, private game: Game) {
    this.hitPoint = game.getMaxHP();
    client.on(SOCKET_EVENT.PlayCard, this.playCard.bind(this));
    client.on(SOCKET_EVENT.Ready, this.ready.bind(this));
    client.on(SOCKET_EVENT.LeaveGame, this.leaveGame.bind(this));
  }

  public getCards(): Card[] {
    return this.cards;
  }

  public getBoardcaster(): Broadcaster {
    return this.game.broadcaster;
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
    for (const debuff of this.debuffs) {
      debuff.trigger();
      if (debuff.getDuration() === 0) this.debuffs = this.debuffs.filter((d) => d !== debuff);
      this.getBoardcaster().dispatchTakeSpell(debuff.toJsonData());
      await waitFor(600);
    }
  }

  private playCard(id: string): void {
    const card = this.getCardById(id);

    if (this.shouldPlayCard && this.game.getCurrentPlayer() === this && card) {
      this.game.consumeCard(card);
      this.shouldPlayCard = false;
    } else {
      this.getClient().send(SOCKET_EVENT.Error, "Not your turn");
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
  }

  public receiveCards(...cards: Card[]): void {
    this.cards.push(...cards);
    this.getClient().send(SOCKET_EVENT.TakeCard, cards);
  }

  public changeHitPoint(difference: number): void {
    this.hitPoint += difference;

    if (this.hitPoint <= 0) {
      this.hitPoint = 0;
      this.cards = [];
    } else if (this.hitPoint > 100) this.hitPoint = 100;

    this.game.broadcaster.dispatchChangeHitPoint(this.toJsonData());
  }

  public async takeSpell(spell: Spell, shouldPierceThrough = false): Promise<void> {
    if (this.talismans[0] && spell.isDebuff() && !shouldPierceThrough) {
      await this.talismans[0].activate(spell);
      this.talismans = this.talismans.filter((t) => t !== this.talismans[0]);
    } else {
      if (spell instanceof PassiveSpell) {
        if (spell.isDebuff()) this.curses.push(spell);
        else {
          // We send TAKE_SPELL event to only the target if they receive talisman.
          this.talismans.push(spell);
          this.client.send(SOCKET_EVENT.TakeSpell, [spell.toJsonData()]);
          return;
        }
      } else if (spell.getDuration() > 0 && spell.isDebuff()) this.debuffs.push(spell);
      else spell.trigger();

      this.game.broadcaster.dispatchTakeSpell(spell.toJsonData());
    }
  }

  public purify(): void {
    this.debuffs = [];
    this.curses = [];
    this.game.sendToAll(SOCKET_EVENT.Purify, this.client.id);
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
