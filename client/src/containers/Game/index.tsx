import React, { useEffect, useReducer, useState } from "react";
import { IGame } from "../../../../shared/src/interfaces/Game";
import { IPlayer } from "../../../../shared/src/interfaces/Player";
import { ISpell } from "../../../../shared/src/interfaces/Spell";
import SOCKET_EVENT from "../../../../shared/src/SocketEvent";
import Notification from "../../components/Notification";
import socket from "../../services/socket";
import useAppState, { APP_STATE } from "../../state/appState";
import "./Game.scss";
import GameBoard from "./GameBoard";
import GameOverDialog from "./GameOverDialog";
import OpponentList from "./OpponentList";
import PlayerHand from "./PlayerHand";
import playerListReducer, { PlayerList, PlayerState, PLAYER_LIST_ACTION_NAME } from "./playerListReducer";
import PlayerStatus from "./PlayerStatus";

interface GameState {
  maxHP: number;
}

// const dummyPlayerState: PlayerState = {
//   id: "",
//   name: "",
//   hp: 0,
//   spells: {},
//   currentSpell: SPELL_NAME.Void,
//   isEliminated: false,
// };

type Winner = Pick<PlayerState, "id" | "name">;

const Game = (): JSX.Element => {
  const appState = useAppState();
  const [chosenCard, setChosenCard] = useState("");
  const [playerList, dispatch] = useReducer(playerListReducer, {} as PlayerList);
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [state, setState] = useState<GameState>({ maxHP: 0 });
  const [winner, setWinner] = useState<Winner | null>(null);

  const onGameOver = (): void => {
    socket.emit(SOCKET_EVENT.LeaveGame);
    appState.set(APP_STATE.Hub);
  };

  useEffect(() => {
    socket.emit(SOCKET_EVENT.Ready);
    socket.on(SOCKET_EVENT.StartTurn, (id: string) => setCurrentPlayer(id));

    socket.on(SOCKET_EVENT.GetGameInfo, ({ players, maxHP }: IGame) => {
      setState({ maxHP: maxHP });
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

    socket.on(SOCKET_EVENT.GameOver, (id: string) => {
      setWinner(playerList[id]);
    });

    socket.on(SOCKET_EVENT.TakeSpell, (payload: ISpell[]) => {
      dispatch({
        name: PLAYER_LIST_ACTION_NAME.AddSpells,
        payload,
      });

      setTimeout(() => dispatch({ name: PLAYER_LIST_ACTION_NAME.ResetSpellAnimation }), 450);
    });

    return (): void => {
      socket.off(SOCKET_EVENT.StartTurn);
      socket.off(SOCKET_EVENT.GetGameInfo);
      socket.off(SOCKET_EVENT.HitPointChanged);
      socket.off(SOCKET_EVENT.Purify);
      socket.off(SOCKET_EVENT.TakeSpell);
      socket.off(SOCKET_EVENT.PlayerEliminated);
    };
  }, []);

  return (
    <div className="game" onClick={() => setChosenCard("")}>
      <OpponentList maxHP={state.maxHP} opponents={Object.values(playerList).filter((p) => p.id !== socket.id)} />
      <GameBoard />
      <div className="player">
        <PlayerStatus maxHP={state.maxHP} hp={playerList[socket.id]?.hp || 0} />
        <PlayerHand
          currentPlayer={currentPlayer}
          chooseCard={(id: string) => setChosenCard(id)}
          chosenCard={chosenCard}
          eliminated={!!playerList[socket.id]?.isEliminated}
        />
      </div>
      <GameOverDialog open={!!winner} onClose={onGameOver} winner={winner as Winner} />
      <Notification />
    </div>
  );
};

export default Game;
export type { Winner };
