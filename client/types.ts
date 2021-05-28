export type SpriteProps = {
  size: [number, number];
  src: string;
  steps?: number;
  fps?: number;
  row?: number;
  scale?: number;
  className?: string;
  loop?: boolean;
  stop?: boolean;
  onAnimationEnd?: () => void;
  onTransitionEnd?: () => void;
  onClick?: () => void;
  onReachFrame?: (frame: number) => void;
};
