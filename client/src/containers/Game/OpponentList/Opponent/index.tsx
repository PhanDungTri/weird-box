import React, { useEffect, useState } from "react";
import { IPlayer } from "../../../../../../shared/src/interfaces/Player";
import SpellAnimation from "../../../../components/SpellAnimation";
import SpellList from "../../../../components/SpellList";
import HitPointBar from "../../../../components/HitPointBar";
import { useSpellAnimationTriggerState, useSpellTrackerState, useGameState } from "../../state";
import "./Opponent.scss";
import socket from "../../../../global/socket";
import SOCKET_EVENT from "../../../../../../shared/src/SocketEvent";

const Opponent = ({ name, hp, id }: IPlayer): JSX.Element => {
  const { maxHP } = useGameState();
  const spells = useSpellTrackerState(id);
  const spellAnimation = useSpellAnimationTriggerState(id);

  useEffect(() => {
    socket.on(SOCKET_EVENT.PlayerEliminated, (data: string) => {
      console.log(data + " DEFEATED");
    });

    return (): void => {
      socket.off(SOCKET_EVENT.PlayerEliminated);
    };
  }, []);

  return (
    <div className="opponent">
      <div className="opponent__name">{name}</div>
      <SpellList spells={spells} />
      <HitPointBar hp={hp} maxHP={maxHP} />
      <SpellAnimation spell={spellAnimation} />
    </div>
  );
};

export default Opponent;
