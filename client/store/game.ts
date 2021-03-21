import produce from "immer";
import { devtools } from "zustand/middleware";
import create from "zustand/vanilla";
import { PASSIVE_ACTION, SOCKET_EVENT, SPELL_NAME } from "../../shared/constants";
import { CardInfo, HitPointChange, PassiveAction, SpellInfo } from "../../shared/@types";
import { PlayerInfo } from "../@types";
import socket from "../services/socket";

type PlayerState = {
  hp: number;
  isEliminated: boolean;
  triggeredSpell: SPELL_NAME | PASSIVE_ACTION;
} & PlayerInfo;

type GameSettings = {
  maxHP: number;
  timePerTurn: number;
};

export type GameState = {
  currentPlayer: string;
  players: Record<string, PlayerState>;
  resetTriggeredSpell: (id: string) => void;
  spells: Record<string, SpellInfo>;
  settings: GameSettings;
  recentPlayedCard: CardInfo | null;
  resetRecentPlayedCard: () => void;
  winner: PlayerInfo | null;
  reset: () => void;
};

const initialState = {
  currentPlayer: "",
  players: {},
  spells: {},
  settings: {
    maxHP: 0,
    timePerTurn: 0,
  },
  recentPlayedCard: null,
  winner: null,
};

const gameState = create<GameState>(
  devtools((set, get) => ({
    ...initialState,
    resetRecentPlayedCard: () => set({ recentPlayedCard: null }),
    resetTriggeredSpell: (id) =>
      set({
        players: produce(get().players, (draft) => {
          draft[id].triggeredSpell = SPELL_NAME.Void;
        }),
      }),
    reset: () => set(initialState),
  }))
);

const { setState, getState } = gameState;

const triggerSpell = (name: SPELL_NAME | PASSIVE_ACTION, target: string) =>
  setState({
    players: produce(getState().players, (draft) => {
      draft[target].triggeredSpell = name;
    }),
  });

const cleanupSpells = (() => {
  let timeout: number;

  return () => {
    if (timeout) clearTimeout(timeout);
    timeout = window.setTimeout(
      () =>
        setState({
          spells: produce(getState().spells, (draft) => {
            for (const id in draft) if (draft[id].duration === 0 || draft[id].power === 0) delete draft[id];
          }),
        }),
      400
    );
  };
})();

export const selectCurrentPlayer = (state: GameState): string => state.currentPlayer;

socket.on(SOCKET_EVENT.GetGameSettings, (settings: GameSettings) => setState({ settings }));
socket.on(SOCKET_EVENT.StartTurn, (currentPlayer: string) => setState({ currentPlayer }));
socket.on(SOCKET_EVENT.GameOver, (winner: PlayerInfo) => setState({ winner }));

socket.on(SOCKET_EVENT.GetPlayerList, (list: PlayerInfo[]) =>
  setState({
    players: list.reduce<Record<string, PlayerState>>((record, p) => {
      record[p.id] = { ...p, isEliminated: false, triggeredSpell: SPELL_NAME.Void, hp: getState().settings.maxHP };
      return record;
    }, {}),
  })
);

socket.on(SOCKET_EVENT.CardPlayed, (recentPlayedCard: CardInfo) => {
  setState({ recentPlayedCard });
  setState({ currentPlayer: "" });
});

socket.on(SOCKET_EVENT.HitPointChanged, ({ target, hp }: HitPointChange) =>
  setState({
    players: produce(getState().players, (draft) => {
      draft[target].hp = hp;
    }),
  })
);

socket.on(SOCKET_EVENT.TakeSpell, (spell: SpellInfo) => {
  const { id, duration, name, target } = spell;
  const spells = getState().spells;

  if (duration > 0 || duration === -1 || spells[id])
    setState({
      spells: produce(spells, (draft) => {
        draft[id] = spell;
      }),
    });

  triggerSpell(name, target);
  cleanupSpells();
});

socket.on(SOCKET_EVENT.ActivatePassive, (passive: PassiveAction) => {
  const { id, action, target } = passive;
  const spells = getState().spells;

  if (spells[id]) {
    setState({
      spells: produce(spells, (draft) => {
        draft[id].power = 0;
      }),
    });
  }

  triggerSpell(action, target);
  cleanupSpells();
});

socket.on(SOCKET_EVENT.PlayerEliminated, (id: string) =>
  setState({
    players: produce(getState().players, (draft) => {
      draft[id].isEliminated = true;
    }),
    currentPlayer: "",
  })
);

export default gameState;
