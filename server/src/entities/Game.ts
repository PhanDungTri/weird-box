import ANIMATION_DURATION from "../../../shared/src/animationDuration";
import SOCKET_EVENT from "../../../shared/src/socketEvent";
import { PlayerInfo } from "../interfaces/PlayerInfo";
import generateUniqueId from "../utilities/generateUniqueId";
import Card, { CardAction } from "./Card";
import Deck from "./Deck";
import Player from "./Player";

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

  private dealCard(): Card {
    if (this.drawDeck.getSize() === 0) {
      this.drawDeck = Deck.copy(this.discardDeck);
      this.drawDeck.shuffle();
      this.discardDeck.clear();
    }
    // TODO handle null card error

    return this.drawDeck.pop() as Card;
  }

  public start(): void {
    /**
     * WHY?
     * If for each card given to a player, there is an event sent to a client then the server will sends up to 20 same events to the clients.
     * To reduce the number of events, the server will wait for the players to take enough number of starting cards before sending the events to client.
     * With above approach, the server will only send up to 4 events to all clients in the game.
     */
    const startingHands: Card[][] = [];

    for (let i = 0; i < STARTING_HAND; i++) {
      for (let j = 0; j < this.players.length; j++) {
        if (!startingHands[j]) startingHands[j] = [];
        startingHands[j].push(this.dealCard());
      }
    }

    for (let j = 0; j < this.players.length; j++) {
      this.players[j].takeCards(...startingHands[j]);
    }

    this.nextPlayer();
  }

  public nextPlayer(): void {
    if (this.currentPlayerIndex === -1) {
      this.currentPlayerIndex = 0;
    } else {
      this.currentPlayerIndex =
        (this.currentPlayerIndex + 1) % this.players.length;
    }

    const currentPlayer = this.getCurrentPlayer();

    currentPlayer.takeCards(this.dealCard());

    setTimeout(
      (() => {
        this.notifyAll(SOCKET_EVENT.StartTurn, currentPlayer.getId());
        currentPlayer.response(SOCKET_EVENT.Info, "It's your turn");
      }).bind(this),
      ANIMATION_DURATION.TakeCard
    );
  }

  public addPlayer(player: Player): void {
    player.setGame(this);
    this.players.push(player);

    player.response(SOCKET_EVENT.GetGameInfo, {
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
    this.notifyAll(SOCKET_EVENT.CardPlayed, card);

    let penalty = 0;
    let timeline = 0;

    if (card.getAction() === CardAction.Charge)
      this.chargePoint += card.getPowerPoint();
    else this.chargePoint -= card.getPowerPoint();

    if (this.chargePoint < 0) {
      penalty = Math.abs(this.chargePoint);
    } else if (this.chargePoint > 10) {
      penalty = this.chargePoint - 10;
    }

    timeline += ANIMATION_DURATION.ConsumeCard;

    if (penalty > 0) {
      this.chargePoint = 0;
      this.notifyAll(
        SOCKET_EVENT.ChargePointBarOvercharged,
        undefined,
        timeline
      );
      this.getCurrentPlayer().takeDamage(penalty);
    }

    this.discardDeck.push(card);
    this.notifyAll(SOCKET_EVENT.ChargePointChanged, this.chargePoint, timeline);

    timeline += ANIMATION_DURATION.ChargePointChange;

    setTimeout(this.nextPlayer.bind(this), timeline);
  }

  public notifyAll(event: string, data?: unknown, wait = 0): void {
    this.players.forEach((p) => p.response(event, data, wait));
  }
}

export default Game;
