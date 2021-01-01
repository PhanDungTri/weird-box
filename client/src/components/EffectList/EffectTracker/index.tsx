import React from "react";
import "./EffectTracker.scss";

interface EffectTrackerProps {
  id: string;
  duration: number;
}

const setCounter = (duration: number): JSX.Element[] => {
  const arr: JSX.Element[] = [];

  for (let i = 0; i < duration; i++) {
    arr.push(<div key={i} className="effect-tracker__counter" />);
  }

  return arr;
};

const EffectTracker = (props: EffectTrackerProps): JSX.Element => {
  return <div className="effect-tracker">{setCounter(props.duration)}</div>;
};

export default EffectTracker;
