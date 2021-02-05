import React from "react";
import spellSpriteHolder from "../../../utils/spellSpriteHolder";
import "./SpellTracker.scss";

interface SpellTrackerProps {
  id: string;
  duration: number;
  name: string;
}

const SpellTracker = ({ duration, name }: SpellTrackerProps): JSX.Element => {
  return (
    <div className="spell-tracker">
      <img src={spellSpriteHolder[name]} />
      <div className="spell-tracker__counter">{duration}</div>
    </div>
  );
};

export default SpellTracker;
