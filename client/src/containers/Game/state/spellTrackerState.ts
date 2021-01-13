import { createState, useState } from "@hookstate/core";
import { ISpell } from "../../../../../shared/src/interfaces/Spell";

type SpellTracker = Record<string, ISpell>;
type SpellTrackerList = Record<string, SpellTracker>;

const spellTrakerState = createState<SpellTrackerList>({});

const useSpellTrackerState = (id: string): ISpell[] => {
  const spells = useState(spellTrakerState).value[id] || {};
  return Object.values(spells);
};

export { spellTrakerState, useSpellTrackerState };
export type { SpellTrackerList };
