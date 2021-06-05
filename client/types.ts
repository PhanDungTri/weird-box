import { ReactNode } from "react-markdown";

export type SpriteProps = {
  size: [number, number];
  src: string;
  className?: string;
  steps?: number;
  fps?: number;
  row?: number;
  scale?: number;
  loop?: number;
  stop?: boolean;
  children?: ReactNode;
  onAnimationEnd?: () => void;
  onTransitionEnd?: () => void;
  onClick?: () => void;
  onReachFrame?: (frame: number) => void;
};
