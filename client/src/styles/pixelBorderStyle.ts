import { css, SerializedStyles } from "@emotion/react";

type BorderColors = [string] | [string, string] | [string, string, string, string];

const pixelBorderStyle = (width: number, color: BorderColors, innerColor?: BorderColors): SerializedStyles => {
  const shape = [`${-width}px 0px 0px`, `${width}px 0px 0px`, `0px ${width} 0px`, `0px ${-width} 0px`];
  const border = shape.map((edge, i) => `${edge} ${color[i] || color[i - 2] || color[0]}`).join(", ");
  const innerBorder = innerColor
    ? shape.map((edge, i) => `inset ${edge} ${innerColor[i] || innerColor[i - 2] || innerColor[0]}`).join(", ")
    : undefined;

  return css`
    margin: ${width}px;
    box-shadow: ${[border, innerBorder].filter(Boolean).join(", ")};
  `;
};

export default pixelBorderStyle;
export type { BorderColors };
