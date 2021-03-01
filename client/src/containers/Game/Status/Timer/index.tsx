import { useEffect, useState } from "react";
import { Transition } from "react-transition-group";
import { TransitionStatus } from "react-transition-group/Transition";
import SandClockSprite from "../../../../assets/sprites/sand_clock_animation.png";
import { useGameContext } from "../../context";
import Sprite from "../../../../components/Sprite";
import "./Timer.scss";
import socket from "../../../../services/socket";
import { SOCKET_EVENT } from "../../../../../../shared/src/@enums";
import { GameSettings } from "../../../../../../shared/src/@types";

type TimerProps = {
  id: string;
  fluid?: boolean;
};

const defaultStyle: React.CSSProperties = {
  transition: `opacity 200ms`,
  overflow: "hidden",
};

const transitionStyles: Record<TransitionStatus, React.CSSProperties> = {
  entering: {
    opacity: 1,
  },
  entered: {
    opacity: 1,
  },
  exiting: {
    opacity: 0,
  },
  exited: {
    opacity: 0,
  },
  unmounted: {},
};

const Timer = ({ id, fluid = false }: TimerProps): JSX.Element => {
  const { currentPlayer } = useGameContext();
  const [timePerTurn, setTimePerTurn] = useState(0);

  useEffect(() => {
    socket.once(SOCKET_EVENT.GetGameSettings, (settings: GameSettings) => setTimePerTurn(settings.timePerTurn));
  }, []);

  return (
    <Transition in={id === currentPlayer} timeout={500}>
      {(state) => (
        <div
          className={`timer ${fluid ? "-fluid" : ""}`}
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
        >
          {id === currentPlayer && (
            <>
              <Sprite src={SandClockSprite} step={9} size={[16, 16]} style={{ position: "relative" }} tick={2} />

              <div
                className="timer__counter"
                style={{
                  animationDuration: `${timePerTurn}ms`,
                }}
              />
            </>
          )}
        </div>
      )}
    </Transition>
  );
};

export default Timer;
