import React from "react";
import { SPELL_NAME } from "../../../../../../shared/src/interfaces/Spell";
import { PlayerState } from "../../business/reducers/playerListReducer";
import Hand from "./Hand";
import Status from "../../../../components/Status";
import { useGameInfoContext } from "../../business/context";

interface PlayerProps {
  info?: PlayerState;
}

const initInfo: PlayerState = {
  id: "",
  name: "",
  hp: 0,
  spells: {},
  currentSpell: SPELL_NAME.Void,
  isEliminated: false,
};

const Player = ({ info = initInfo }: PlayerProps): JSX.Element => {
  return (
    <div className="player">
      <Status id={info.id} hp={info.hp} spells={Object.values(info.spells)} horizontal />
      <Hand eliminated={info.isEliminated} />
    </div>
  );
};

export default Player;
