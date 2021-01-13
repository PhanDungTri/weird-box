import { createState, useState } from "@hookstate/core";
import SPELL_NAME from "../../../../../shared/src/SpellName";

type SpellAnimationTriggerList = Record<string, SPELL_NAME>;

const spellAnimationTriggerState = createState<SpellAnimationTriggerList>({});

const useSpellAnimationTriggerState = (id: string): SPELL_NAME => {
  return useState(spellAnimationTriggerState).value[id];
};

export { spellAnimationTriggerState, useSpellAnimationTriggerState };
export type { SpellAnimationTriggerList };
