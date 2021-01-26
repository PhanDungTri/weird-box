import { none, useState as useHookState } from "@hookstate/core";
import React, { useEffect, useState } from "react";
import { IGame } from "../../../../shared/src/interfaces/Game";
import { IPlayer } from "../../../../shared/src/interfaces/Player";
import { ISpell } from "../../../../shared/src/interfaces/Spell";
import SOCKET_EVENT from "../../../../shared/src/SocketEvent";
import SPELL_NAME from "../../../../shared/src/SpellName";
import Notification from "../../components/Notification";
import socket from "../../global/socket";
import "./Game.scss";
import GameBoard from "./GameBoard";
import OpponentList from "./OpponentList";
import PlayerHand from "./PlayerHand";
import PlayerStatus from "./PlayerStatus";

interface GameState {
  maxHP: number;
}

interface PlayerState extends IPlayer {
  spells: {
    [id: string]: ISpell;
  };
  currentSpell: SPELL_NAME;
}

interface PlayerList {
  [id: string]: PlayerState;
}

const Game = (): JSX.Element => {
  const [chosenCard, setChosenCard] = useState("");
  const playerList = useHookState<PlayerList>({});
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [state, setState] = useState<GameState>({ maxHP: 0 });

  useEffect(() => {
    socket.on(SOCKET_EVENT.StartTurn, (id: string) => setCurrentPlayer(id));

    socket.on(SOCKET_EVENT.GetGameInfo, (payload: IGame) => {
      setState({ maxHP: payload.maxHP });
      playerList.set(
        payload.players.reduce<PlayerList>((acc, cur) => {
          acc[cur.id] = {
            ...cur,
            spells: {},
            currentSpell: SPELL_NAME.Void,
          };

          return acc;
        }, {})
      );
    });

    socket.on(SOCKET_EVENT.HitPointChanged, (payload: Omit<IPlayer, "name">[]) => {
      playerList.batch((list) => payload.forEach((p) => list[p.id].hp.set(p.hp)));
    });

    socket.on(SOCKET_EVENT.Purify, (id: string) => {
      playerList[id].spells.set({});
    });

    socket.on(SOCKET_EVENT.TakeSpell, (payload: ISpell[]) => {
      playerList.batch((list) =>
        payload.forEach((s) => {
          const spell = list[s.target].spells[s.id];

          if (s.duration === 0 && spell.value) spell.set(none);
          else if (s.duration > 0) spell.set(s);
        })
      );

      setTimeout(
        () =>
          playerList.batch((list) =>
            Object.values(list.value).forEach((p) => {
              if (p.currentSpell !== SPELL_NAME.Void) list[p.id].currentSpell.set(SPELL_NAME.Void);
            })
          ),
        600
      );
    });

    return (): void => {
      socket.off(SOCKET_EVENT.StartTurn);
      socket.off(SOCKET_EVENT.GetGameInfo);
      socket.off(SOCKET_EVENT.HitPointChanged);
      socket.off(SOCKET_EVENT.Purify);
      socket.off(SOCKET_EVENT.TakeSpell);
    };
  }, []);

  return (
    <div className="game" onClick={() => setChosenCard("")}>
      <OpponentList maxHP={state.maxHP} opponents={Object.values(playerList.value).filter((p) => p.id !== socket.id)} />
      <GameBoard />
      <PlayerStatus maxHP={state.maxHP} info={playerList[socket.id].value} />
      <PlayerHand
        currentPlayer={currentPlayer}
        chooseCard={(id: string) => setChosenCard(id)}
        chosenCard={chosenCard}
      />
      <Notification />
    </div>
  );
};

export default Game;
export type { PlayerList, PlayerState };
