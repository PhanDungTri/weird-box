import React, { useEffect, useRef, useState } from "react";
import spellSpriteHolder from "../../../utils/spellSpriteHolder";
import "./SpellTracker.scss";

interface SpellTrackerProps {
  id: string;
  duration: number;
  name: string;
}

const SpellTracker = ({ duration, name }: SpellTrackerProps): JSX.Element => {
  const [triggered, setTriggered] = useState(false);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      setTriggered(true);
      setTimeout(() => setTriggered(false), 450);
    }
  }, [duration]);

  return (
    <div className="spell-tracker">
      <img className={`spell-tracker__img ${triggered ? "-triggered" : ""}`} src={spellSpriteHolder[name]} />
      <div className="spell-tracker__counter">{duration}</div>
    </div>
  );
};

export default SpellTracker;
