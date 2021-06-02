import { SERVER_EVENT_NAME, SPELL_NAME } from "../../../shared/constants";
import { waitFor } from "../../utilities";
import Card from "../Card";
import Client from "../Client";
import ClientDerived from "../Client/ClientDerived";
import InGameState from "../Client/State/InGameState";
import InTurnState from "../Client/State/InTurnState";
import Game from "../Game";
import Spell from "../Spell";
import SpellManager from "./SpellManager";

class Player extends ClientDerived {
  public isEliminated = false;
  private cards: Card[] = [];
  private spellManager;
  private hitPoint: number;

  constructor(client: Client, private game: Game) {
    super(client);

    this.hitPoint = this.game.maxHP;
    this.spellManager = new SpellManager(this, this.game.broadcast.bind(this.game));

    this.client.changeState(new InGameState(this.client, this, this.game));
  }

  public getHitPoint(): number {
    return this.hitPoint;
  }

  public getClient(): Client {
    return this.client;
  }

  public startTurn(): void {
    this.client.changeState(new InTurnState(this.client, this, this.game));
  }

  public async update(): Promise<void> {
    await this.spellManager.triggerPendingDebuffs();
  }

  public takeCards(...cards: Card[]): void {
    this.cards.push(...cards);
    this.client.getSocket().emit(
      SERVER_EVENT_NAME.GetCards,
      cards.map((c) => ({ id: c.id, power: c.getPower(), spell: c.getSpell() }))
    );
  }

  public async playCard(id: string): Promise<void> {
    const card = this.cards.find((c) => c.id === id);

    if (card) {
      this.game.endTurn();
      this.client.changeState(new InGameState(this.client, this, this.game));

      this.cards = this.cards.filter((c) => c.id !== id);
      this.game.discardCard(card);

      this.game.broadcast(SERVER_EVENT_NAME.CardPlayed, {
        id: card.id,
        power: card.getPower(),
        spell: [SPELL_NAME.Shield, SPELL_NAME.Mirror].includes(card.getSpell()) ? SPELL_NAME.Void : card.getSpell(),
      });

      await waitFor(1000);
      await this.game.consumeCard(card);
    } else this.socket.emit(SERVER_EVENT_NAME.Notify, "errGeneric", "Danger");
  }

  public changeHitPoint(difference: number): void {
    this.hitPoint += difference;

    if (this.hitPoint <= 0) this.hitPoint = 0;
    else if (this.hitPoint > this.game.maxHP) this.hitPoint = this.game.maxHP;

    this.game.broadcast(SERVER_EVENT_NAME.HitPointChanged, this.id, this.hitPoint);
  }

  public async takeSpell(spell: Spell): Promise<void> {
    await this.spellManager.takeSpell(spell);
  }
}

export default Player;
