import Game from ".";
import { CLIENT_EVENT_NAME, SERVER_EVENT_NAME } from "../../../shared/@types";
import { SPELL_NAME } from "../../../shared/constants";
import waitFor from "../../utilities/waitFor";
import Card from "../Card";
import Player from "../Player";
import SpellFactory from "../Spell/SpellFactory";

class Turn {
  private timeout = setTimeout(() => {
    this.game.eliminatePlayer(this.currentPlayer);
    this.endTurn();
  }, this.game.timePerTurn);

  constructor(private currentPlayer: Player, private alivePlayers: Player[], private game: Game) {
    this.currentPlayer.getClient().getSocket().on(CLIENT_EVENT_NAME.PlayCard, this.onPlayCard.bind(this));
    this.currentPlayer.takeCards(game.drawCard());
    this.currentPlayer.getClient().getSocket().emit(SERVER_EVENT_NAME.Notify, "It's your turn", "Info");
    this.game.broadcast(SERVER_EVENT_NAME.NewTurn, currentPlayer.getClient().id);
  }

  private async updatePlayerStatus() {
    for (const p of this.alivePlayers) {
      if (!p.isEliminated) {
        await p.update();
        if (p.getHitPoint() <= 0) this.game.eliminatePlayer(p);
      }
    }
  }

  private async sendRecentPlayedCard(card: Card) {
    this.game.broadcast(SERVER_EVENT_NAME.CardPlayed, {
      id: card.id,
      power: card.getPower(),
      spell: [SPELL_NAME.Shield, SPELL_NAME.Mirror].includes(card.getSpell()) ? SPELL_NAME.Void : card.getSpell(),
    });

    await waitFor(1000);
  }

  private async onOvercharged() {
    this.game.broadcast(SERVER_EVENT_NAME.Overcharged);
    this.currentPlayer.changeHitPoint(-10);
    await this.game.changeChargePoint(0);
  }

  private async distributeSpell(spell: SPELL_NAME) {
    if (this.game.getChargePoint() > 0)
      await SpellFactory.create(spell, this.game.getChargePoint(), this.alivePlayers, this.currentPlayer);
  }

  private onPlayCard(id: string, cb: (err: boolean, msg?: string) => void) {
    const card = this.currentPlayer.getCardById(id);

    if (card) {
      clearTimeout(this.timeout);
      this.currentPlayer.getClient().getSocket().removeAllListeners(CLIENT_EVENT_NAME.PlayCard);
      cb(false);
      this.currentPlayer.discardCard(id);
      this.game.discardCard(card);
      this.sendRecentPlayedCard(card);
      this.consumeCard(card);
    } else cb(true, "Invalid card!");
  }

  public async consumeCard(card: Card): Promise<void> {
    const newChargePoint = this.game.getChargePoint() + card.getPower();

    if (newChargePoint < 0 || newChargePoint > 10) await this.onOvercharged();
    else {
      await this.distributeSpell(card.getSpell());
      await this.game.changeChargePoint(newChargePoint);
    }

    this.endTurn();
  }

  public onEndGame(): boolean {
    if (this.game.shouldEnd()) {
      clearTimeout(this.timeout);
      this.game.broadcast(
        SERVER_EVENT_NAME.GameOver,
        this.alivePlayers.find((p) => !p.isEliminated)?.getClient().id || ""
      );

      return true;
    }

    return false;
  }

  public async endTurn(): Promise<void> {
    await this.updatePlayerStatus();
    if (!this.onEndGame()) this.game.newTurn(this.alivePlayers.filter((p) => !p.isEliminated));
  }
}

export default Turn;
