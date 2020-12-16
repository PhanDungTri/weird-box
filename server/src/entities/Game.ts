import { PlayerInfo } from "../interfaces/PlayerInfo";
import generateUniqueId from "../utilities/generateUniqueId";
import Card, { CardAction } from "./Card";
import Deck from "./Deck";
import Player from "./Player";
import ANIMATION_DURATION from "../../../shared/animationDuration";

const STARTING_HAND = 5;

class Game {
  public readonly id = generateUniqueId();
  private chargePoint = 0;
  private drawDeck = new Deck();
  private discardDeck: Deck = new Deck({ isEmpty: true });
  private players: Player[] = [];
  private currentPlayerIndex = -1;
  private maxHP = 100;

  public getMaxHP(): number {
    return this.maxHP;
  }

  public getCurrentPlayer(): Player {
    return this.players[this.currentPlayerIndex];
  }

  public getChargePoint(): number {
    return this.chargePoint;
  }

  private dealCard(player: Player): void {
    if (this.drawDeck.getSize() === 0) {
      this.drawDeck = Deck.copy(this.discardDeck);
      this.drawDeck.shuffle();
      this.discardDeck.clear();
    }

    const card = this.drawDeck.pop();

    if (card) {
      player.takeCard(card);
    }

    // TODO handle null card error
  }

  public start(): void {
    for (let i = 0; i < STARTING_HAND; i++) {
      for (const p of this.players) {
        this.dealCard(p);
      }
    }

    this.nextPlayer();
  }

  public addPlayer(player: Player): void {
    player.setGame(this);
    this.players.push(player);

    player.response("get game info", {
      maxHP: this.maxHP,
    });

    for (const p of this.players) {
      p.response(
        "update opponent list",
        this.players.reduce<PlayerInfo[]>((opponents, pl) => {
          if (pl !== p) opponents.push(pl.getInfo());
          return opponents;
        }, [])
      );
    }

    if (this.players.length === 2) this.start();
  }

  public consumeCard(card: Card): void {
    let penalty = 0;

    if (card.getAction() === CardAction.Charge)
      this.chargePoint += card.getPowerPoint();
    else this.chargePoint -= card.getPowerPoint();

    if (this.chargePoint < 0) {
      penalty = Math.abs(this.chargePoint);
    } else if (this.chargePoint > 10) {
      penalty = this.chargePoint - 10;
    }

    if (penalty > 0) {
      this.chargePoint = 0;
      this.getCurrentPlayer().takeDamage(penalty);
    }

    this.discardDeck.push(card);

    for (const p of this.players) {
      p.response("update game", {
        playedCard: card,
        chargePoint: this.chargePoint,
      });
    }

    setTimeout(this.nextPlayer.bind(this), ANIMATION_DURATION.ConsumeCard);
  }

  public nextPlayer(): void {
    if (this.currentPlayerIndex === -1) {
      this.currentPlayerIndex = 0;
    } else {
      this.currentPlayerIndex =
        (this.currentPlayerIndex + 1) % this.players.length;
    }

    const currentPlayer = this.getCurrentPlayer();

    currentPlayer.response("info", "It's your turn");
    this.dealCard(currentPlayer);
  }

  public notifyAll(event: string, data: unknown): void {
    this.players.forEach((p) => p.response(event, data));
  }
}

export default Game;
