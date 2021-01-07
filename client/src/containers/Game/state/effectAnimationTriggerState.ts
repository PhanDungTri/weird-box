import { createState, useState } from "@hookstate/core";
import EFFECT_NAME from "../../../../../shared/src/effectName";

type EffectAnimationTriggerList = Record<string, EFFECT_NAME>;

const effectAnimationTriggerState = createState<EffectAnimationTriggerList>({});

const useEffectAnimationTriggerState = (id: string): EFFECT_NAME => {
  return useState(effectAnimationTriggerState).value[id];
};

export { effectAnimationTriggerState, useEffectAnimationTriggerState };
export type { EffectAnimationTriggerList };
