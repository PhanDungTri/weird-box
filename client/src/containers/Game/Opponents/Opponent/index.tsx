import React from "react";
import { PlayerInfo } from "../../../../@types";
import SpellAnimation from "../../SpellAnimation";
import Status from "../../Status";
import "./Opponent.scss";

const Opponent = ({ id, name, isEliminated }: PlayerInfo): JSX.Element => {
  return (
    <div className={`opponent ${isEliminated ? "-disabled" : ""}`}>
      <Status id={id} />
      <div className="opponent__name">{name}</div>
      <SpellAnimation id={id} />
    </div>
  );
};

export default Opponent;
