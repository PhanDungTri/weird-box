import ANIMATION_DURATION from "../../../shared/src/AnimationDuration";
import SOCKET_EVENT from "../../../shared/src/SocketEvent";
import generateUniqueId from "../utilities/generateUniqueId";
import Card from "./Card";
import Client from "./Client";
import Deck from "./Deck";
import Broadcaster from "./Broadcaster";
import Player from "./Player";
import { IGame } from "../../../shared/src/interfaces/Game";
import SpellFactory from "./spells/SpellFactory";
import Spectator from "./Spectator";
import waitFor from "../utilities/waitFor";

interface GameOptions {
  maxHP: number;
}

const defaultOptions: GameOptions = {
  maxHP: 100,
};

const STARTING_HAND = 5;

class Game {
  public readonly id = generateUniqueId();
  public readonly broadcaster = new Broadcaster(this);
  private players: Player[];
  private currentPlayerIndex: number;
  private maxHP: number;
  private spectators: Spectator[] = [];
  private chargePoint = 0;
  private drawDeck = new Deck();
  private discardDeck: Deck = new Deck({ isEmpty: true });
  private numOfReadyPlayers = 0;

  constructor(options = defaultOptions, ...clients: Client[]) {
    this.maxHP = options.maxHP;
    this.players = clients.map((cl) => new Player(cl, this));
    this.currentPlayerIndex = this.players.length - 1;

    this.sendToAll(SOCKET_EVENT.GameFound);
  }

  public getMaxHP(): number {
    return this.maxHP;
  }

  public getCurrentPlayer(): Player {
    return this.players[this.currentPlayerIndex];
  }

  public getChargePoint(): number {
    return this.chargePoint;
  }

  public getPlayers(): Player[] {
    return this.players;
  }

  private dealCard(): Card {
    if (this.drawDeck.getSize() === 0) {
      this.drawDeck = Deck.copy(this.discardDeck);
      this.discardDeck.clear();
      this.drawDeck.shuffle();
    }

    const card = this.drawDeck.pop();
    if (card) return card;
    throw new Error("Undefined card!"); // TODO handle null card error
  }

  private start(): void {
    /**
     * WHY?
     * If for each card given to a player, there is an event sent to a client then the server will sends up to 20 same events to the clients.
     * To reduce the number of events, the server will wait for the players to take enough number of starting cards before sending the events to client.
     * With above approach, the server will only send up to 4 events to all clients in the game.
     */
    const startingHands: Card[][] = [];
    const info: IGame = {
      maxHP: this.maxHP,
      players: this.players.map((p) => p.toJsonData()),
    };

    this.sendToAll(SOCKET_EVENT.GetGameInfo, info);

    for (let i = 0; i < STARTING_HAND; i++) {
      for (let j = 0; j < this.players.length; j++) {
        if (!startingHands[j]) startingHands[j] = [];
        startingHands[j].push(this.dealCard());
      }
    }

    for (let j = 0; j < this.players.length; j++) {
      this.players[j].takeCards(...startingHands[j]);
    }

    this.newTurn();
  }

  public checkReady(): void {
    this.numOfReadyPlayers++;

    if (this.numOfReadyPlayers === this.players.length) {
      this.start();
    }
  }

  public eliminatePlayer(id: string): void {
    const player = this.players.find((p) => p.getClient().id === id);

    if (player) {
      this.players = this.players.filter((p) => p !== player);
      this.spectators.push(new Spectator(player.getClient(), this));
      this.sendToAll(SOCKET_EVENT.PlayerEliminated, player.getClient().id);
    }
  }

  public async newTurn(): Promise<void> {
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    const currentPlayer = this.getCurrentPlayer();

    // wait for all players complete their updates
    await Promise.all(this.players.map((p) => p.update()));

    currentPlayer.takeCards(this.dealCard());

    // wait for deal card animation
    await waitFor(600);
    this.sendToAll(SOCKET_EVENT.StartTurn, currentPlayer.getClient().id);
  }

  public async consumeCard(card: Card): Promise<void> {
    let penalty = 0;
    const oldChargePoint = this.chargePoint;
    this.chargePoint += card.getPowerPoint();

    this.sendToAll(SOCKET_EVENT.CardPlayed, card);

    // wait for played card animation
    await waitFor(600);

    if (this.chargePoint < 0) {
      penalty = Math.abs(this.chargePoint);
    } else if (this.chargePoint > 10) {
      penalty = this.chargePoint - 10;
    }

    if (penalty > 0) {
      this.chargePoint = 0;
      this.sendToAll(SOCKET_EVENT.ChargePointBarOvercharged);
      this.getCurrentPlayer().changeHitPoint(-penalty);
    } else {
      SpellFactory.create(card.getSpell(), oldChargePoint, this.players, this.getCurrentPlayer());
      // wait for spell animation
      await waitFor(600);
    }

    this.sendToAll(SOCKET_EVENT.ChargePointChanged, this.chargePoint);
    // wait for changing charge point animation
    await waitFor(600);
    this.discardDeck.push(card);
    this.newTurn();
  }

  public sendToAll(event: SOCKET_EVENT, data?: unknown, wait = 0): void {
    [...this.players, ...this.spectators].forEach((p) => p.getClient().send(event, data, wait));
  }
}

export default Game;
