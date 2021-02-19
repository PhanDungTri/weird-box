import { IGame } from "../../../../shared/src/interfaces/Game";
import SOCKET_EVENT from "../../../../shared/src/SocketEvent";
import generateUniqueId from "../../utilities/generateUniqueId";
import waitFor from "../../utilities/waitFor";
import Card from "../Card";
import Client from "../Client";
import Deck from "./Deck";
import SpellFactory from "../Spell/SpellFactory";
import Broadcaster from "./Broadcaster";
import Player from "../Player";

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
  private alivePlayers: Player[];
  private players: Player[];
  private currentPlayerIndex: number;
  private maxHP: number;
  private chargePoint = 0;
  private numOfReadyPlayers = 0;
  private drawDeck = new Deck();
  private discardDeck: Deck = new Deck({ isEmpty: true });

  constructor(options = defaultOptions, ...clients: Client[]) {
    this.maxHP = options.maxHP;
    this.alivePlayers = clients.map((cl) => new Player(cl, this));
    this.players = [...this.alivePlayers];
    this.currentPlayerIndex = this.alivePlayers.length - 1;

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
      for (let j = 0; j < this.alivePlayers.length; j++) {
        if (!startingHands[j]) startingHands[j] = [];
        startingHands[j].push(this.dealCard());
      }
    }

    for (let j = 0; j < this.alivePlayers.length; j++) {
      this.alivePlayers[j].receiveCards(...startingHands[j]);
    }

    this.newTurn();
  }

  public checkReady(): void {
    this.numOfReadyPlayers++;

    if (this.numOfReadyPlayers === this.players.length) {
      this.start();
    }

    // TODO timeout when there is one or more players haven't readied
  }

  public eliminatePlayer(player: Player): void {
    this.alivePlayers = this.alivePlayers.filter((p) => p !== player);
    this.sendToAll(SOCKET_EVENT.PlayerEliminated, player.getClient().id);
  }

  public removePlayer(player: Player): void {
    if (this.alivePlayers.includes(player)) this.eliminatePlayer(player);
    this.players = this.players.filter((p) => p !== player);
    this.sendToAll(SOCKET_EVENT.PlayerLeftGame, player.getClient().id);
  }

  public async newTurn(): Promise<void> {
    // wait for all players complete their updates
    await Promise.all(this.alivePlayers.map((p) => p.update()));

    // check if player is eliminated
    this.alivePlayers.forEach((player) => {
      if (player.getHitPoint() <= 0) this.eliminatePlayer(player);
    });

    if (this.alivePlayers.length === 0) {
      // TODO draw
      return;
    }

    if (this.alivePlayers.length === 1) {
      this.sendToAll(SOCKET_EVENT.GameOver, this.alivePlayers[0].getClient().id);
      // TODO etc
      return;
    }

    let currentPlayer: Player;

    do {
      this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
      currentPlayer = this.getCurrentPlayer();
    } while (!this.alivePlayers.includes(currentPlayer));

    currentPlayer.receiveCards(this.dealCard());

    // wait for deal card animation
    await waitFor(600);

    currentPlayer.startTurn();
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
    } else if (oldChargePoint > 0) {
      SpellFactory.create(card.getSpell(), oldChargePoint, this.alivePlayers, this.getCurrentPlayer());
      // wait for spell animation
      await waitFor(600);
    }

    this.sendToAll(SOCKET_EVENT.ChargePointChanged, this.chargePoint);
    // wait for changing charge point animation
    await waitFor(600);
    this.discardDeck.push(card);
    this.newTurn();
  }

  public sendToAll(event: SOCKET_EVENT, data?: unknown): void {
    this.players.forEach((p) => p.getClient().send(event, data));
  }
}

export default Game;
