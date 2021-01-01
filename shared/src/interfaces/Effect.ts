import EFFECT_NAME from "../effectName";

interface IEffect {
  id: string;
  name: EFFECT_NAME;
  duration: number;
}

interface IEffectEvent {
  target: string;
  effect: IEffect;
}

export { IEffect, IEffectEvent };
