import React, { useEffect, useReducer, useState } from "react";
import { IGame } from "../../../../shared/src/interfaces/Game";
import { IPlayer } from "../../../../shared/src/interfaces/Player";
import { IPassiveAction, ISpell } from "../../../../shared/src/interfaces/Spell";
import SOCKET_EVENT from "../../../../shared/src/SocketEvent";
import { SPELL_NAME } from "../../../../shared/src/interfaces/Spell";
import Notification from "../../components/Notification";
import SpellAnimation from "../../components/SpellAnimation";
import socket from "../../services/socket";
import useAppState, { APP_STATE } from "../../state/appState";
import { GameProvider, useCardChoiceContext, useGameInfoContext } from "./business/context";
import playerListReducer, {
  PlayerList,
  PlayerState,
  PLAYER_LIST_ACTION_NAME,
} from "./business/reducers/playerListReducer";
import GameBoard from "./components/GameBoard";
import GameOverDialog from "./components/GameOverDialog";
import OpponentList from "./components/OpponentList";
import Player from "./components/Player";
import "./Game.scss";

type Winner = Pick<PlayerState, "id" | "name">;

const Game = (): JSX.Element => {
  const appState = useAppState();
  const { clearCardChoice } = useCardChoiceContext();
  const { setGameInfo } = useGameInfoContext();
  const [playerList, dispatch] = useReducer(playerListReducer, {} as PlayerList);
  const [winner, setWinner] = useState<Winner | null>(null);

  const onGameOver = (): void => {
    socket.emit(SOCKET_EVENT.LeaveGame);
    appState.set(APP_STATE.Hub);
  };

  useEffect(() => {
    socket.emit(SOCKET_EVENT.Ready);

    socket.on(SOCKET_EVENT.GetGameInfo, ({ players, maxHP }: IGame) => {
      setGameInfo({ maxHP: maxHP });
      dispatch({
        name: PLAYER_LIST_ACTION_NAME.Populate,
        payload: players,
      });
    });

    socket.on(SOCKET_EVENT.PlayerEliminated, (id: string) => {
      dispatch({
        name: PLAYER_LIST_ACTION_NAME.Eliminate,
        payload: id,
      });
    });

    socket.on(SOCKET_EVENT.HitPointChanged, (payload: Omit<IPlayer, "name">[]) => {
      dispatch({
        name: PLAYER_LIST_ACTION_NAME.UpdateHitPoints,
        payload,
      });
    });

    socket.on(SOCKET_EVENT.Purify, (id: string) => {
      dispatch({
        name: PLAYER_LIST_ACTION_NAME.Purify,
        payload: id,
      });
    });

    socket.on(SOCKET_EVENT.TakeSpell, (payload: ISpell[]) => {
      dispatch({
        name: PLAYER_LIST_ACTION_NAME.AddSpells,
        payload,
      });

      setTimeout(() => dispatch({ name: PLAYER_LIST_ACTION_NAME.CleanUpSpells }), 450);
    });

    socket.on(SOCKET_EVENT.ActivatePassive, (payload: IPassiveAction[]) => {
      dispatch({
        name: PLAYER_LIST_ACTION_NAME.ActivatePassive,
        payload,
      });

      setTimeout(() => dispatch({ name: PLAYER_LIST_ACTION_NAME.CleanUpSpells }), 450);
    });

    return (): void => {
      socket.off(SOCKET_EVENT.GetGameInfo);
      socket.off(SOCKET_EVENT.HitPointChanged);
      socket.off(SOCKET_EVENT.Purify);
      socket.off(SOCKET_EVENT.TakeSpell);
      socket.off(SOCKET_EVENT.PlayerEliminated);
      socket.off(SOCKET_EVENT.GameOver);
      socket.off(SOCKET_EVENT.ActivatePassive);
    };
  }, []);

  useEffect(() => {
    socket.on(SOCKET_EVENT.GameOver, (id: string) => {
      setWinner(playerList[id]);
    });

    return (): void => {
      socket.off(SOCKET_EVENT.GameOver);
    };
  }, [playerList]);

  return (
    <div className="game" onClick={clearCardChoice}>
      <OpponentList opponents={Object.values(playerList).filter((p) => p.id !== socket.id)} />
      <GameBoard />
      <SpellAnimation name={playerList[socket.id]?.currentSpell || SPELL_NAME.Void} scale={4} />
      <Player info={playerList[socket.id]} />
      <GameOverDialog open={!!winner} onClose={onGameOver} winner={winner as Winner} />
      <Notification />
    </div>
  );
};

const GameWithContext = (): JSX.Element => {
  return (
    <GameProvider>
      <Game />
    </GameProvider>
  );
};

export default GameWithContext;
export type { Winner };
