import { SOCKET_EVENT } from "../../../../shared/src/@enums";
import generateUniqueId from "../../utilities/generateUniqueId";
import waitFor from "../../utilities/waitFor";
import Card from "../Card";
import Client from "../Client";
import Player from "../Player";
import Server from "../Server";
import SpellFactory from "../Spell/SpellFactory";
import Deck from "./Deck";

interface GameOptions {
  maxHP?: number;
  timePerTurn?: number;
}

const defaultOptions: GameOptions = {
  maxHP: 100,
  timePerTurn: 15000,
};

const STARTING_HAND = 5;

class Game {
  public readonly id = generateUniqueId();
  private alivePlayers: Player[];
  private players: Player[];
  private currentPlayerIndex: number;
  private maxHP: number;
  private timePerTurn: number;
  private chargePoint = 0;
  private numOfReadyPlayers = 0;
  private drawDeck = new Deck();
  private discardDeck: Deck = new Deck({ isEmpty: true });
  private turnTimer: NodeJS.Timeout | undefined;

  constructor(private server: Server, options = defaultOptions, ...clients: Client[]) {
    this.maxHP = options.maxHP as number;
    this.timePerTurn = options.timePerTurn as number;
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

    this.sendToAll(SOCKET_EVENT.GetGameSettings, {
      maxHP: this.maxHP,
      timePerTurn: this.timePerTurn,
    });

    this.sendToAll(
      SOCKET_EVENT.GetPlayerList,
      this.players.map((p) => ({
        id: p.getClient().id,
        name: p.getClient().name,
        isEliminated: false,
      }))
    );

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

  private eliminatePlayer(player: Player): void {
    if (this.alivePlayers.includes(player)) {
      this.alivePlayers = this.alivePlayers.filter((p) => p !== player);
      this.sendToAll(SOCKET_EVENT.PlayerEliminated, player.getClient().id);
      if (this.getCurrentPlayer() === player) this.newTurn();
    }
  }

  public removePlayer(player: Player): void {
    if (!this.players.includes(player)) return;
    this.eliminatePlayer(player);
    this.sendToAll(SOCKET_EVENT.PlayerLeftGame, player.getClient().id);
    this.shouldEnd();
  }

  private shouldEnd(): boolean {
    if (this.alivePlayers.length === 0) return true;
    if (this.alivePlayers.length === 1) {
      const winner = this.alivePlayers[0].getClient();

      if (this.turnTimer) clearTimeout(this.turnTimer);

      this.sendToAll(SOCKET_EVENT.GameOver, {
        id: winner.id,
        name: winner.name,
      });
      this.server.removeGame(this);

      return true;
    }

    return false;
  }

  public async newTurn(): Promise<void> {
    // wait for all players complete their updates
    //await Promise.all(this.alivePlayers.map((p) => p.update()));
    for (const p of this.alivePlayers) {
      await p.update();
      if (p.getHitPoint() <= 0) this.eliminatePlayer(p);
    }

    if (this.shouldEnd()) return;

    let currentPlayer: Player;

    do {
      this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
      currentPlayer = this.getCurrentPlayer();
    } while (!this.alivePlayers.includes(currentPlayer) && this.alivePlayers.length !== 0);

    await currentPlayer.receiveCards(this.dealCard());
    currentPlayer.startTurn();

    if (this.turnTimer) {
      clearTimeout(this.turnTimer);
    }

    this.turnTimer = setTimeout(this.eliminatePlayer.bind(this), this.timePerTurn, this.getCurrentPlayer());

    this.sendToAll(SOCKET_EVENT.StartTurn, currentPlayer.getClient().id);
  }

  public async consumeCard(card: Card): Promise<void> {
    if (this.turnTimer) {
      clearTimeout(this.turnTimer);
    }

    const oldChargePoint = this.chargePoint;
    this.chargePoint += card.getPower();

    await this.sendToAll(SOCKET_EVENT.CardPlayed, card.toJsonData(), 600);

    if (this.chargePoint < 0 || this.chargePoint > 10) {
      this.chargePoint = 0;
      this.sendToAll(SOCKET_EVENT.ChargePointBarOvercharged);
      await this.getCurrentPlayer().changeHitPoint(-10);
    } else if (oldChargePoint > 0)
      await SpellFactory.create(card.getSpell(), oldChargePoint, this.alivePlayers, this.getCurrentPlayer());

    await this.sendToAll(SOCKET_EVENT.ChargePointChanged, this.chargePoint, 600);
    this.discardDeck.push(card);
    this.newTurn();
  }

  public async sendToAll(event: SOCKET_EVENT, data?: unknown, wait = 0): Promise<void> {
    this.players.forEach((p) => p.getClient().send(event, data));
    await waitFor(wait);
  }
}

export default Game;
