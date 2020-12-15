interface PixelBorderOptions {
  width?: string;
  color?: string;
  inset?: boolean;
  omit?: {
    left?: boolean;
    right?: boolean;
    top?: boolean;
    bottom?: boolean;
  };
}

const defaultOptions: PixelBorderOptions = {
  width: "1px",
  color: "#000",
  inset: false,
  omit: {
    left: false,
    right: false,
    top: false,
    bottom: false,
  },
};

const createPixelBorder = ({ width, color, inset, omit } = defaultOptions): string => {
  const sides: string[] = [];

  if (!omit?.left) {
    sides.push(`-${width} 0px`);
  }

  if (!omit?.right) {
    sides.push(`${width} 0px`);
  }

  if (!omit?.top) {
    sides.push(`0px -${width}`);
  }

  if (!omit?.bottom) {
    sides.push(`0px ${width}`);
  }

  return sides.map((side) => (inset ? "inset " : "") + side + ` 0px 0px ${color}`).join(",");
};

export default createPixelBorder;
