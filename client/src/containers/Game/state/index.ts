import { none } from "@hookstate/core";
import ANIMATION_DURATION from "../../../../../shared/src/AnimationDuration";
import { IGame } from "../../../../../shared/src/interfaces/Game";
import { IPlayer } from "../../../../../shared/src/interfaces/Player";
import { ISpell } from "../../../../../shared/src/interfaces/Spell";
import SOCKET_EVENT from "../../../../../shared/src/SocketEvent";
import SPELL_NAME from "../../../../../shared/src/SpellName";
import socket from "../../../global/socket";
import { appState, APP_STATE } from "../../../state/appState";
import { useChosenCardState } from "./chosenCardState";
import { currentPlayerState, useCurrentPlayerState } from "./currentPlayerState";
import { gameState, useGameState } from "./gameState";
import { PlayerList, playerListState, usePlayerListState } from "./playerListState";
import {
  SpellAnimationTriggerList,
  spellAnimationTriggerState,
  useSpellAnimationTriggerState,
} from "./spellAnimationTriggerState";
import { SpellTrackerList, spellTrakerState, useSpellTrackerState } from "./spellTrackerState";

socket.on(SOCKET_EVENT.HitPointChanged, (payload: Omit<IPlayer, "name">[]) => {
  playerListState.batch((list) => {
    for (const p of payload) {
      list[p.id].hp.set(p.hp);
    }
  });
});

socket.on(SOCKET_EVENT.GetGameInfo, (payload: IGame) => {
  const playerList: PlayerList = {};
  const spellTrackerList: SpellTrackerList = {};
  const spellAnimationTriggerList: SpellAnimationTriggerList = {};

  for (const p of payload.players) {
    playerList[p.id] = p;
    spellTrackerList[p.id] = {};
    spellAnimationTriggerList[p.id] = SPELL_NAME.Void;
  }

  playerListState.set(playerList);
  spellTrakerState.set(spellTrackerList);
  spellAnimationTriggerState.set(spellAnimationTriggerList);
  gameState.maxHP.set(payload.maxHP);
  appState.set(APP_STATE.InGame);
});

socket.on(SOCKET_EVENT.StartTurn, (id: string) => currentPlayerState.set(id));

socket.on(SOCKET_EVENT.Purify, (id: string) => spellTrakerState[id].set({}));

socket.on(SOCKET_EVENT.TakeSpell, (payload: ISpell[]) => {
  spellAnimationTriggerState.batch((list) => {
    for (const s of payload) {
      list[s.target].set(s.name);
    }
  });

  setTimeout(
    () =>
      spellAnimationTriggerState.batch((list) => {
        for (const s of payload) {
          list[s.target].set(SPELL_NAME.Void);
        }
      }),
    ANIMATION_DURATION.TakeSpell
  );

  spellTrakerState.batch((list) => {
    for (const s of payload) {
      const spell = list[s.target][s.id];
      if (s.duration === 0 && spell) spell.set(none);
      else if (s.duration > 0) spell.set(s);
    }
  });
});

export {
  usePlayerListState,
  useGameState,
  useChosenCardState,
  useCurrentPlayerState,
  useSpellTrackerState,
  useSpellAnimationTriggerState,
};
