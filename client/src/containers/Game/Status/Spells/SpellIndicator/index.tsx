import React, { useEffect, useRef, useState } from "react";
import Transition, { TransitionStatus } from "react-transition-group/Transition";
import { SpellInfo } from "../../../../../../../shared/src/@types";
import spriteLookup from "../../../../../utils/spriteLookup";
import "./SpellIndicator.scss";

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

const SpellIndicator = ({ duration, name, power }: SpellInfo): JSX.Element => {
  const [triggered, setTriggered] = useState(false);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      setTriggered(true);
      setTimeout(() => setTriggered(false), 200);
    }
  }, [duration, power]);

  return (
    <div className="spell-indicator">
      <Transition in={triggered} timeout={200}>
        {(state) => (
          <img
            className={`spell-tracker__img`}
            src={spriteLookup[name]}
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          />
        )}
      </Transition>
      <div className="spell-indicator__counter">{power}</div>
    </div>
  );
};

export default SpellIndicator;
