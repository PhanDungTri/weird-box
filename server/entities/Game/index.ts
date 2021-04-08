import { of, timer } from "rxjs";
import { delay, map, mapTo } from "rxjs/operators";
import { EventsFromServer, SERVER_EVENT_NAME } from "../../../shared/@types";
import { SOCKET_EVENT, SPELL_NAME } from "../../../shared/constants";
import generateUniqueId from "../../../shared/utils/generateUniqueId";
import waitFor from "../../utilities/waitFor";
import Card from "../Card";
import Client from "../Client";
import Player from "../Player";
import Server from "../Server";
import Spell from "../Spell";
import SpellFactory from "../Spell/SpellFactory";
import Deck from "./Deck";
import GameReadyChecker from "./GameReadyChecker";

type GameOptions = {
  maxHP?: number;
  timePerTurn?: number;
};

const NUM_OF_STARTING_CARDS = 5;
const DEFAULT_MAX_HP = 100;
const DEFAULT_TIME_PER_TURN = 15000;

class Game {
  public readonly id = generateUniqueId();
  private alivePlayers: Player[];
  private players: Player[];
  private currentPlayerIndex: number;
  private chargePoint = 0;
  private drawDeck = new Deck();
  private discardDeck: Deck = new Deck({ isEmpty: true });
  private turnTimer: NodeJS.Timeout | undefined;

  constructor(clients: Client[], private maxHP = DEFAULT_MAX_HP, private timePerTurn = DEFAULT_TIME_PER_TURN) {
    this.players = clients.map((cl) => new Player(cl, this));
    this.alivePlayers = [...this.players];
    this.currentPlayerIndex = this.alivePlayers.length - 1;
    new GameReadyChecker(clients, this);

    this.broadcast(SOCKET_EVENT.NewGame);
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

  private drawCard(): Card {
    if (this.drawDeck.getSize() === 0) {
      this.drawDeck.copy(this.discardDeck);
      this.discardDeck.clear();
      this.drawDeck.shuffle();
    }

    return this.drawDeck.pop() as Card;
  }

  private dealCards(): Card[][] {
    const startingHands: Card[][] = [];

    for (let i = 0; i < NUM_OF_STARTING_CARDS; i++) {
      for (let j = 0; j < this.alivePlayers.length; j++) {
        if (!startingHands[j]) startingHands[j] = [];
        startingHands[j].push(this.drawCard());
      }
    }

    return startingHands;
  }

  private start(): void {
    const startingHands = this.dealCards();

    const playerList = this.players.map((p) => ({
      id: p.getClient().id,
      name: p.getClient().name,
      isEliminated: false,
    }));

    this.players.forEach((p, i) => {
      const client = p.getClient();
      client.emit(SERVER_EVENT_NAME.GetGameSettings, this.maxHP, this.timePerTurn);
      client.emit(SERVER_EVENT_NAME.GetPlayerList, playerList);
      // TODO send starting hand to client
    });

    this.newTurn();
  }

  private eliminatePlayer(player: Player): void {
    if (this.alivePlayers.includes(player)) {
      this.alivePlayers = this.alivePlayers.filter((p) => p !== player);
      this.broadcast(SOCKET_EVENT.PlayerEliminated, player.getClient().id);
      if (this.getCurrentPlayer() === player) this.newTurn();
    }
  }

  public removePlayer(player: Player): void {
    if (!this.players.includes(player)) return;
    this.eliminatePlayer(player);
    this.broadcast(SOCKET_EVENT.PlayerLeftGame, player.getClient().id);
    this.shouldEnd();
  }

  private shouldEnd(): boolean {
    if (this.alivePlayers.length === 0) return true;
    if (this.alivePlayers.length === 1) {
      const winner = this.alivePlayers[0].getClient();

      if (this.turnTimer) clearTimeout(this.turnTimer);

      this.broadcast(SOCKET_EVENT.GameOver, {
        id: winner.id,
        name: winner.name,
      });
      this.server.removeGame(this);

      return true;
    }

    return false;
  }

  public async newTurn(): Promise<void> {
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

    await currentPlayer.receiveCards(this.drawCard());
    currentPlayer.startTurn();

    if (this.turnTimer) clearTimeout(this.turnTimer);
    this.turnTimer = setTimeout(this.eliminatePlayer.bind(this), this.timePerTurn, this.getCurrentPlayer());

    this.broadcast(SOCKET_EVENT.StartTurn, currentPlayer.getClient().id);
  }

  private async changeChargePoint(point: number) {
    // TODO change charge point
  }

  private async sendRecentPlayedCard(card: Card) {
    // TODO emit recent played card to all players
    // TODO wait for 600ms
  }

  private onOvercharged() {
    // TODO handle overcharged
  }

  private distributeSpell(spell: SPELL_NAME) {
    // TODO distribute spell to the others
  }

  public async consumeCard(card: Card): Promise<void> {
    if (this.turnTimer) clearTimeout(this.turnTimer);

    this.sendRecentPlayedCard(card);
    this.discardDeck.push(card);

    const newChargePoint = this.chargePoint + card.getPower();

    if (newChargePoint < 0 || newChargePoint > 10) this.onOvercharged();
    else {
      if (this.chargePoint > 0) this.distributeSpell(card.getSpell());
      this.changeChargePoint(newChargePoint);
    }

    this.newTurn();
    //----------------------------------------------
    if (this.turnTimer) clearTimeout(this.turnTimer);

    const oldChargePoint = this.chargePoint;
    this.chargePoint += card.getPower();

    await this.broadcast(SOCKET_EVENT.CardPlayed, card.toJsonData(), 600);

    if (this.chargePoint < 0 || this.chargePoint > 10) {
      this.chargePoint = 0;
      this.broadcast(SOCKET_EVENT.Overcharged);
      await this.getCurrentPlayer().changeHitPoint(-10);
    } else if (oldChargePoint > 0)
      await SpellFactory.create(card.getSpell(), oldChargePoint, this.alivePlayers, this.getCurrentPlayer());

    await this.broadcast(SOCKET_EVENT.ChargePointChanged, this.chargePoint, 600);
    this.discardDeck.push(card);
    this.newTurn();
  }

  public broadcast(event: SERVER_EVENT_NAME, ...data: Parameters<EventsFromServer[SERVER_EVENT_NAME]>): void {
    this.players.forEach((p) => p.getClient().emit(event, ...data));
  }
}

export default Game;
