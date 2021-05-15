import { EventsFromServer } from "../../../shared/@types";
import { DEFAULT_MAX_HP, DEFAULT_TIME_PER_TURN, SERVER_EVENT_NAME, SPELL_NAME } from "../../../shared/constants";
import generateUniqueId from "../../../shared/utils/generateUniqueId";
import waitFor from "../../utilities/waitFor";
import Card from "../Card";
import Client from "../Client";
import GameLoadingChecker from "./GameLoadingChecker";
import Player from "../Player";
import Room from "../Room";
import SpellFactory from "../Spell/SpellFactory";
import Deck from "./Deck";
import IdleState from "../Client/State/IdleState";

const NUM_OF_STARTING_CARDS = 5;

class Game {
  public readonly id = generateUniqueId();
  private players: Player[];
  private currentPlayerIndex: number;
  private chargePoint = 0;
  private drawDeck = new Deck();
  private discardDeck: Deck = new Deck(true);
  private timeout!: number;

  constructor(
    clients: Client[],
    private room?: Room,
    public readonly maxHP = DEFAULT_MAX_HP,
    public readonly timePerTurn = DEFAULT_TIME_PER_TURN
  ) {
    this.players = clients.map((cl) => new Player(cl, this));
    this.currentPlayerIndex = this.players.length - 1;
    new GameLoadingChecker(this, clients, this.room);
    this.broadcast(SERVER_EVENT_NAME.NewGame);
  }

  public getCurrentPlayer(): Player {
    return this.players[this.currentPlayerIndex];
  }

  private shouldEnd() {
    return this.players.reduce((count, p) => (p.isEliminated ? count : count + 1), 0) <= 1;
  }

  private dealCards() {
    const startingHands: Card[][] = [];

    for (let i = 0; i < NUM_OF_STARTING_CARDS; i++) {
      for (let j = 0; j < this.players.length; j++) {
        if (!startingHands[j]) startingHands[j] = [];
        startingHands[j].push(this.drawCard());
      }
    }

    return startingHands;
  }

  private async changeChargePoint(point: number): Promise<void> {
    this.chargePoint = point;
    this.broadcast(SERVER_EVENT_NAME.ChargePointChanged, this.chargePoint);
    await waitFor(1000);
  }

  private async onOvercharged() {
    this.broadcast(SERVER_EVENT_NAME.Overcharged);
    this.getCurrentPlayer().changeHitPoint(-10);
    await this.changeChargePoint(0);
  }

  private async distributeSpell(spell: SPELL_NAME) {
    if (this.chargePoint > 0)
      await SpellFactory.create(
        spell,
        this.chargePoint,
        this.players.filter((p) => !p.isEliminated),
        this.getCurrentPlayer()
      );
  }

  private async newTurn() {
    this.nextPlayer();
    const currentPlayer = this.getCurrentPlayer();

    currentPlayer.takeCards(this.drawCard());
    this.broadcast(SERVER_EVENT_NAME.NewTurn, currentPlayer.id, this.drawDeck.getSize());

    this.timeout = setTimeout(this.eliminatePlayer.bind(this), this.timePerTurn);
  }

  private async endTurn() {
    await this.updatePlayers();

    if (this.shouldEnd()) this.end();
    else this.newTurn();
  }

  private async updatePlayers() {
    for (const p of this.players) {
      if (!p.isEliminated) {
        await p.update();
        if (p.getHitPoint() <= 0) this.eliminatePlayer(p);
      }
    }
  }

  private nextPlayer() {
    do {
      this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    } while (this.getCurrentPlayer().isEliminated);

    this.getCurrentPlayer().startTurn();
  }

  private end() {
    clearTimeout(this.timeout);
    this.broadcast(SERVER_EVENT_NAME.GameOver, this.players.find((p) => !p.isEliminated)?.id || "");
    this.players.forEach((p) => this.removePlayer(p));
  }

  public drawCard(): Card {
    if (this.drawDeck.getSize() === 0) {
      this.drawDeck.copy(this.discardDeck);
      this.discardDeck.clear();
      this.drawDeck.shuffle();
    }

    return this.drawDeck.pop() as Card;
  }

  public discardCard(card: Card): void {
    this.discardDeck.push(card);
  }

  public async consumeCard(card: Card): Promise<void> {
    clearTimeout(this.timeout);
    const newChargePoint = this.chargePoint + card.getPower();

    if (newChargePoint < 0 || newChargePoint > 10) await this.onOvercharged();
    else {
      await this.distributeSpell(card.getSpell());
      await this.changeChargePoint(newChargePoint);
    }

    this.endTurn();
  }

  public start(): void {
    const startingHands = this.dealCards();
    const playerList = this.players.map((p) => ({
      ...p.getClient().getInfo(),
      isEliminated: p.isEliminated,
    }));

    this.players.forEach((p, i) => {
      p.socket.emit(SERVER_EVENT_NAME.GetGameSettings, this.maxHP, this.timePerTurn);
      p.socket.emit(SERVER_EVENT_NAME.GetPlayerList, playerList);
      p.takeCards(...startingHands[i]);
    });

    this.newTurn();
  }

  public eliminatePlayer(player: Player): void {
    player.isEliminated = true;
    this.broadcast(SERVER_EVENT_NAME.PlayerEliminated, player.id);

    if (this.getCurrentPlayer() === player) this.endTurn();
    else if (this.shouldEnd()) this.end();
  }

  public removePlayer(player: Player): void {
    const client = player.getClient();
    this.players = this.players.filter((p) => p !== player);

    if (this.room && this.shouldEnd()) this.room.back(client);
    else {
      this.room?.remove(client);
      client.changeState(new IdleState(client));
    }
  }

  public broadcast(event: SERVER_EVENT_NAME, ...data: Parameters<EventsFromServer[SERVER_EVENT_NAME]>): void {
    this.players.forEach((p) => p.socket.emit(event, ...data));
  }
}

export default Game;
