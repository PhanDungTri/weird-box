import constate from "constate";
import { useState } from "react";
import ANIMATION_DURATION from "../../../../shared/src/animationDuration";
import EFFECT_NAME from "../../../../shared/src/effectName";
import { IEffect, IEffectEvent } from "../../../../shared/src/interfaces/Effect";
import { IPlayer } from "../../../../shared/src/interfaces/Player";
import SOCKET_EVENT from "../../../../shared/src/socketEvent";
import useSocketEvent from "../../hooks/useSocketEvent";

type EffectList = Record<string, Record<string, IEffect>>;
type EffectAnimationList = Record<string, EFFECT_NAME>;

interface GameInfo {
  maxHP: number;
}

const gameContext = () => {
  const [maxHP, setMaxHP] = useState(0);
  const [playerList, setPlayerList] = useState<Record<string, IPlayer>>({});
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [effectList, setEffectList] = useState<EffectList>({});
  const [effectAnimationList, setEffectAnimationList] = useState<EffectAnimationList>({});
  const [chosenCard, setChosenCard] = useState("");

  const resetChosenCard = (): void => setChosenCard("");
  const getPlayerById = (id: string): IPlayer => playerList[id];
  const getEffectsOfPlayer = (id: string): Record<string, IEffect> => effectList[id];
  const getEffectAnimationOfPlayer = (id: string): EFFECT_NAME => effectAnimationList[id];

  const setEffectAnimationOfPlayer = (id: string, name: EFFECT_NAME): void =>
    setEffectAnimationList((list) => ({
      ...list,
      [id]: name,
    }));

  const animateEffect = (data: IEffectEvent): void => {
    setEffectAnimationOfPlayer(data.target, data.effect.name);
    setTimeout(() => setEffectAnimationOfPlayer(data.target, EFFECT_NAME.Void), ANIMATION_DURATION.TakeEffect);
  };

  const updateEffectListOfPlayer = (data: IEffectEvent): void => {
    setEffectList((list) => ({
      ...list,
      [data.target]: {
        ...list[data.target],
        [data.effect.id]: data.effect,
      },
    }));
  };

  useSocketEvent(SOCKET_EVENT.GetGameInfo, (data: GameInfo) => setMaxHP(data.maxHP));
  useSocketEvent(SOCKET_EVENT.StartTurn, (id: string) => setCurrentPlayer(id));

  useSocketEvent(SOCKET_EVENT.GetPlayerList, (data: IPlayer[]) => {
    const plList: Record<string, IPlayer> = {};
    const effList: EffectList = {};
    const effAnimList: EffectAnimationList = {};

    for (const p of data) {
      plList[p.id] = p;
      effList[p.id] = {};
      effAnimList[p.id] = EFFECT_NAME.Void;
    }

    setPlayerList(plList);
    setEffectList(effList);
    setEffectAnimationList(effAnimList);
  });

  useSocketEvent(SOCKET_EVENT.HitPointChanged, (data: Omit<IPlayer, "name">[]) => {
    setPlayerList((list) =>
      data.reduce(
        (updated, d) => {
          updated[d.id].hp = d.hp;
          return updated;
        },
        { ...list }
      )
    );
  });

  useSocketEvent(SOCKET_EVENT.TakeEffect, (data: IEffectEvent) => {
    animateEffect(data);
    if (data.effect.duration > 0) updateEffectListOfPlayer(data);
  });

  useSocketEvent(SOCKET_EVENT.TickEffect, (data: IEffectEvent) => {
    animateEffect(data);
    if (data.effect.duration === 0) {
      setEffectList((list) => {
        const updated = { ...list[data.target] };
        delete updated[data.effect.id];

        return {
          ...list,
          [data.target]: updated,
        };
      });
    } else updateEffectListOfPlayer(data);
  });

  return {
    maxHP,
    playerList,
    setPlayerList,
    getPlayerById,
    currentPlayer,
    effectList,
    setEffectList,
    getEffectsOfPlayer,
    effectAnimationList,
    getEffectAnimationOfPlayer,
    chosenCard,
    setChosenCard,
    resetChosenCard,
  };
};

const [GameContextProvider, useGameContext] = constate(gameContext);

export { GameContextProvider, useGameContext };
