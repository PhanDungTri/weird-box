import { none } from "@hookstate/core";
import ANIMATION_DURATION from "../../../../../shared/src/animationDuration";
import EFFECT_NAME from "../../../../../shared/src/effectName";
import { IEffect, IEffectEvent } from "../../../../../shared/src/interfaces/Effect";
import { IPlayer } from "../../../../../shared/src/interfaces/Player";
import SOCKET_EVENT from "../../../../../shared/src/socketEvent";
import { useChosenCardState } from "./chosenCardState";
import { currentPlayerState, useCurrentPlayerState } from "./currentPlayerState";
import {
  EffectAnimationTriggerList,
  effectAnimationTriggerState,
  useEffectAnimationTriggerState,
} from "./effectAnimationTriggerState";
import { EffectTrackerList, effectTrakerState, useEffectTrackerState } from "./effectTrackerState";
import { gameState, GameState, useGameState } from "./gameState";
import { PlayerList, playerListState, usePlayerListState } from "./playerListState";
import socket from "../../../global/socket";

const triggerEffectAnimation = (payload: IEffectEvent) => {
  effectAnimationTriggerState[payload.target].set(payload.effect.name);
  setTimeout(() => effectAnimationTriggerState[payload.target].set(EFFECT_NAME.Void), ANIMATION_DURATION.TakeEffect);
};

socket.on(SOCKET_EVENT.GetPlayerList, (payload: IPlayer[]) => {
  const playerList: PlayerList = {};
  const effectTrackerList: EffectTrackerList = {};
  const effectAnimationTriggerList: EffectAnimationTriggerList = {};

  for (const p of payload) {
    playerList[p.id] = p;
    effectTrackerList[p.id] = {};
    effectAnimationTriggerList[p.id] = EFFECT_NAME.Void;
  }

  playerListState.set(playerList);
  effectTrakerState.set(effectTrackerList);
  effectAnimationTriggerState.set(effectAnimationTriggerList);
});

socket.on(SOCKET_EVENT.HitPointChanged, (payload: Omit<IPlayer, "name">[]) => {
  playerListState.batch((list) => {
    for (const p of payload) {
      list[p.id].hp.set(p.hp);
    }
  });
});

socket.on(SOCKET_EVENT.GetGameInfo, (payload: GameState) => gameState.maxHP.set(payload.maxHP));

socket.on(SOCKET_EVENT.StartTurn, (id: string) => currentPlayerState.set(id));

socket.on(SOCKET_EVENT.Sanitize, (id: string) => effectTrakerState[id].set({}));

socket.on(SOCKET_EVENT.TakeEffect, (payload: IEffectEvent) => {
  triggerEffectAnimation(payload);
  if (payload.effect.duration > 0) {
    effectTrakerState[payload.target][payload.effect.id].set(payload.effect);
  }
});

socket.on(SOCKET_EVENT.TickEffect, (payload: IEffectEvent) => {
  let updated: IEffect | typeof none = payload.effect;

  if (payload.effect.duration === 0) updated = none;

  triggerEffectAnimation(payload);
  effectTrakerState[payload.target][payload.effect.id].set(updated);
});

export {
  usePlayerListState,
  useGameState,
  useChosenCardState,
  useCurrentPlayerState,
  useEffectTrackerState,
  useEffectAnimationTriggerState,
};
