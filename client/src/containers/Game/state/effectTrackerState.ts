import { createState, useState } from "@hookstate/core";
import { IEffect } from "../../../../../shared/src/interfaces/Effect";

type EffectTracker = Record<string, IEffect>;
type EffectTrackerList = Record<string, EffectTracker>;

const effectTrakerState = createState<EffectTrackerList>({});

const useEffectTrackerState = (id: string): IEffect[] => {
  const effects = useState(effectTrakerState).value[id] || {};
  return Object.values(effects);
};

export { effectTrakerState, useEffectTrackerState };
export type { EffectTrackerList };
