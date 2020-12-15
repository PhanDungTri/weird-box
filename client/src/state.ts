import { atom } from "recoil";
import { Manager, Socket } from "socket.io-client";

enum GameState {
  TEST = "test",
  MAIN_MENU = "main menu",
}

const manager = new Manager("ws://192.168.1.195:3000");
const socket = manager.socket("/");

const gameState = atom<GameState>({
  key: "gameState",
  default: GameState.MAIN_MENU,
});

const socketState = atom<Socket>({
  key: "socketState",
  default: socket,
});

export { gameState, socketState };
