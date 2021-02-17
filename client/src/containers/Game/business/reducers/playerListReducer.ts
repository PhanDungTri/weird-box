import { IPlayer } from "../../../../../../shared/src/interfaces/Player";
import { IPassiveAction, ISpell, PASSIVE_ACTION } from "../../../../../../shared/src/interfaces/Spell";
import { SPELL_NAME } from "../../../../../../shared/src/interfaces/Spell";

enum PLAYER_LIST_ACTION_NAME {
  Populate,
  Eliminate,
  AddSpells,
  CleanUpSpells,
  UpdateHitPoints,
  Purify,
  ActivatePassive,
}

interface PlayerState extends IPlayer {
  spells: {
    [id: string]: ISpell;
  };
  currentSpell: SPELL_NAME | PASSIVE_ACTION;
  isEliminated: boolean;
}

interface PlayerList {
  [id: string]: PlayerState;
}

type PlayerListAction = {
  name: PLAYER_LIST_ACTION_NAME;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
};

const populateList = (_: PlayerList, payload: IPlayer[]): PlayerList =>
  payload.reduce<PlayerList>((acc, cur) => {
    acc[cur.id] = {
      ...cur,
      spells: {},
      currentSpell: SPELL_NAME.Void,
      isEliminated: false,
    };

    return acc;
  }, {});

const eliminatePlayer = (list: PlayerList, id: string): PlayerList => {
  if (list[id]) {
    return {
      ...list,
      [id]: {
        ...list[id],
        spells: {},
        isEliminated: true,
      },
    };
  }

  return list;
};

const addSpells = (list: PlayerList, spells: ISpell[]): PlayerList =>
  spells.reduce<PlayerList>((acc, cur) => {
    if (!acc[cur.target]) return acc;

    const targetSpells = { ...acc[cur.target].spells };

    if (cur.duration > 0 || cur.duration === -1 || (targetSpells[cur.id] && cur.duration === 0))
      targetSpells[cur.id] = cur;

    return {
      ...acc,
      [cur.target]: {
        ...acc[cur.target],
        spells: targetSpells,
        currentSpell: cur.name,
      },
    };
  }, list);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const cleanUpSpells = (list: PlayerList, _: unknown): PlayerList =>
  Object.keys(list).reduce<PlayerList>((acc, cur) => {
    const spells = Object.values(acc[cur].spells).reduce<Record<string, ISpell>>((acc, cur) => {
      if (cur.duration !== 0) acc[cur.id] = cur;
      return acc;
    }, {});

    return {
      ...acc,
      [cur]: {
        ...acc[cur],
        spells,
        currentSpell: SPELL_NAME.Void,
      },
    };
  }, list);

const updateHitPoints = (list: PlayerList, payload: Omit<IPlayer, "name">[]): PlayerList =>
  payload.reduce<PlayerList>((acc, cur) => {
    if (!acc[cur.id]) return acc;

    return {
      ...acc,
      [cur.id]: {
        ...acc[cur.id],
        hp: cur.hp,
      },
    };
  }, list);

const purifyPlayer = (list: PlayerList, id: string): PlayerList => {
  if (!list[id]) return list;

  return {
    ...list,
    [id]: {
      ...list[id],
      spells: {},
    },
  };
};

const activatePassiveSpell = (list: PlayerList, payload: IPassiveAction[]): PlayerList =>
  payload.reduce<PlayerList>((acc, { id, target, action }) => {
    if (!acc[target]) return acc;

    const nextSpellList = { ...acc[target].spells };
    delete nextSpellList[id];

    return {
      ...acc,
      [target]: {
        ...acc[target],
        currentSpell: action,
        spells: nextSpellList,
      },
    };
  }, list);

const handlerHolder = {
  [PLAYER_LIST_ACTION_NAME.Populate]: populateList,
  [PLAYER_LIST_ACTION_NAME.Eliminate]: eliminatePlayer,
  [PLAYER_LIST_ACTION_NAME.AddSpells]: addSpells,
  [PLAYER_LIST_ACTION_NAME.CleanUpSpells]: cleanUpSpells,
  [PLAYER_LIST_ACTION_NAME.UpdateHitPoints]: updateHitPoints,
  [PLAYER_LIST_ACTION_NAME.Purify]: purifyPlayer,
  [PLAYER_LIST_ACTION_NAME.ActivatePassive]: activatePassiveSpell,
};

const playerListReducer = (list: PlayerList, action: PlayerListAction): PlayerList => {
  const handler = handlerHolder[action.name];
  if (handler) return handler(list, action.payload);
  return list;
};

export default playerListReducer;
export { PLAYER_LIST_ACTION_NAME };
export type { PlayerList, PlayerState };
