import React, { useEffect, useRef, useState } from "react";
import "./Sprite.scss";

interface Props {
  size: [number, number];
  src: string;
  scale?: number;
  step?: number;
  tick?: number;
  children?: React.ReactNode;
  repeat?: boolean;
}

const Sprite = ({ src, step = 1, tick = 1, size, scale = 1, repeat = false }: Props): JSX.Element => {
  const [currentStep, setCurrentStep] = useState(0);
  const [width, height] = useRef(size.map((s) => s * scale)).current;
  const isMaxStep = useRef(currentStep === step - 1);
  const frame = useRef(0);

  const animate = (): void => {
    if (isMaxStep.current && !repeat) return;

    if (frame.current < tick) {
      frame.current = frame.current + 1;
      requestAnimationFrame(animate);
      return;
    }

    setCurrentStep((cur) => {
      isMaxStep.current = cur === step - 1;
      return (cur + 1) % step;
    });
    frame.current = 0;
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (step > 1) {
      animate();
    }
  }, []);

  return (
    <div
      className="sprite"
      style={{
        width: width + "px",
        height: height + "px",
        backgroundImage: `url(${src})`,
        backgroundPositionX: -currentStep * width,
      }}
    />
  );
};

export default Sprite;
