import { useState, useRef, useEffect } from "react";

interface AnimationParams {
  step: number;
  tick: number;
  repeat?: number;
  start?: boolean;
}

interface StepAnimationHook {
  currentStep: number;
  animate: (trigger: boolean) => void;
}

/** `repeat`: -1 is infinite, 0 is no repeat, other numbers are how many times the animation will be played. */
const useStepAnimation = ({ step, tick, repeat = -1, start = true }: AnimationParams): StepAnimationHook => {
  // TODO throw error if step or tick is zero
  const [currentStep, setCurrentStep] = useState(0);
  const [trigger, setTrigger] = useState(start);
  const frame = useRef(0); // wait for `tick` frames before performing next step
  const isMaxStep = useRef(currentStep === step - 1);
  const repeatCounter = useRef(0);

  const animate = (): void => {
    if (isMaxStep.current && repeat !== -1) {
      if (repeat === 0 || repeatCounter.current === repeat) {
        setTrigger(false);
        return;
      }

      repeatCounter.current++;
    }

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
    if (trigger && step > 1) animate();
    else {
      frame.current = 0;
      isMaxStep.current = false;
      repeatCounter.current = 0;
      setCurrentStep(0);
    }
  }, [trigger]);

  return { currentStep, animate: setTrigger };
};

export default useStepAnimation;
