import React from "react";
import { Transition } from "react-transition-group";
import { TransitionStatus } from "react-transition-group/Transition";
import SandClockSprite from "../../assets/sprites/sand_clock_animation.png";
import Sprite from "../Sprite";
import "./Timer.scss";

interface TimerProps {
  duration?: number;
  fluid?: boolean;
  isRunning?: boolean;
}

const defaultStyle: React.CSSProperties = {
  transition: `max-height 200ms, opacity 200ms`,
  overflow: "hidden",
};

const transitionStyles: Record<TransitionStatus, React.CSSProperties> = {
  entering: {
    maxHeight: "16px",
    opacity: 1,
  },
  entered: {
    maxHeight: "16px",
    opacity: 1,
  },
  exiting: {
    maxHeight: "0px",
    opacity: 0,
  },
  exited: {
    maxHeight: "0px",
    opacity: 0,
  },
  unmounted: {},
};

const Timer = ({ duration = 15000, fluid = false, isRunning = false }: TimerProps): JSX.Element => {
  return (
    <Transition in={isRunning} timeout={200}>
      {(state) => (
        <div
          className={`timer ${fluid ? "-fluid" : ""}`}
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
        >
          <Sprite src={SandClockSprite} step={9} size={[16, 16]} style={{ position: "relative" }} tick={2} />
          {isRunning && (
            <div
              className="timer__counter"
              style={{
                animationDuration: `${duration - 200}ms`,
              }}
            />
          )}
        </div>
      )}
    </Transition>
  );
};

export default Timer;
