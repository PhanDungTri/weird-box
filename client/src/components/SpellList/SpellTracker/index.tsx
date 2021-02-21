import React, { useEffect, useRef, useState } from "react";
import Transition, { TransitionStatus } from "react-transition-group/Transition";
import spriteLibrary from "../../../utils/spriteLibrary";
import "./SpellTracker.scss";

interface SpellTrackerProps {
  id: string;
  counter: number;
  name: string;
}

const defaultStyle: React.CSSProperties = {
  transition: "transform 150ms ease",
};

const transitionStyles: Record<TransitionStatus, React.CSSProperties> = {
  entering: {
    transform: "scale(1.5)",
  },
  entered: {
    transform: "scale(1.5)",
  },
  exiting: {
    transform: "scale(1)",
  },
  exited: {
    transform: "scale(1)",
  },
  unmounted: {},
};

const SpellTracker = ({ counter, name }: SpellTrackerProps): JSX.Element => {
  const [triggered, setTriggered] = useState(false);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      setTriggered(true);
      setTimeout(() => setTriggered(false), 400);
    }
  }, [counter]);

  return (
    <div className="spell-tracker">
      <Transition in={triggered} timeout={200}>
        {(state) => (
          <img
            className={`spell-tracker__img`}
            src={spriteLibrary[name]}
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          />
        )}
      </Transition>
      <div className="spell-tracker__counter">{counter}</div>
    </div>
  );
};

export default SpellTracker;
