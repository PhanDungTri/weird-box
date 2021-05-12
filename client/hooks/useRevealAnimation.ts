import { ForwardedProps, useTransition, UseTransitionResult } from "react-spring";

export const useRevealAnimation = (
  show: boolean
): UseTransitionResult<boolean, ForwardedProps<React.CSSProperties>>[] => {
  const transitions = useTransition(show, null, {
    from: { position: "absolute", opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return transitions;
};
