import React from "react";
import "./SpellTracker.scss";

interface SpellTrackerProps {
  id: string;
  duration: number;
}

const setCounter = (duration: number): JSX.Element[] => {
  const arr: JSX.Element[] = [];

  for (let i = 0; i < duration; i++) {
    arr.push(<div key={i} className="spell-tracker__counter" />);
  }

  return arr;
};

const SpellTracker = (props: SpellTrackerProps): JSX.Element => {
  return <div className="spell-tracker">{setCounter(props.duration)}</div>;
};

export default SpellTracker;
