import React, { useRef } from "react";
import useStepAnimation from "../../hooks/useStepAnimation";
import "./Sprite.scss";

interface Props {
  size: [number, number];
  src: string;
  scale?: number;
  step?: number;
  tick?: number;
  repeat?: number;
  centerize?: boolean;
  style?: React.CSSProperties;
}

const Sprite = ({
  src,
  step = 1,
  tick = 1,
  size,
  scale = 1,
  repeat = -1,
  centerize = false,
  style,
}: Props): JSX.Element => {
  const { currentStep } = useStepAnimation({ step, tick, repeat, start: true });
  const [width, height] = useRef(size.map((s) => s * scale)).current;

  return (
    <div
      className={`sprite ${centerize ? "-centerize" : ""}`}
      style={{
        ...style,
        width: width + "px",
        height: height + "px",
        backgroundImage: `url(${src})`,
        backgroundPositionX: -currentStep * width,
      }}
    />
  );
};

export default Sprite;
