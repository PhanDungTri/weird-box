import { COLOR } from "../constants";

type RGB = [number, number, number];

export const hexToRgb = (color: string): RGB => {
  if (color.charAt(0) === "#") color = color.substring(1);

  const bigInt = parseInt(color, 16);
  const r = (bigInt >> 16) & 255;
  const g = (bigInt >> 8) & 255;
  const b = bigInt & 255;

  return [r, g, b];
};

export const rgbToHex = (color: RGB): string =>
  "#" +
  color.reduce((acc, cur) => {
    const hex = cur.toString(16);
    return acc + (hex.length === 1 ? "0" + hex : hex);
  }, "");

export const isDarkColor = (color: string): boolean => {
  const [r, g, b] = hexToRgb(color);
  const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

  return hsp <= 127.5;
};

export const shadeColor = (color: string, percent: number): string =>
  rgbToHex(hexToRgb(color).map((c) => Math.round(c * (1 - percent / 100))) as RGB);

export const tintColor = (color: string, percent: number): string =>
  rgbToHex(hexToRgb(color).map((c) => Math.round(c + ((255 - c) * percent) / 100)) as RGB);

export const randomHexColor = (): string => "#" + Math.floor(Math.random() * 16777215).toString(16);

export const autoTextColor = (color: COLOR): COLOR => (isDarkColor(color) ? COLOR.White : COLOR.Black);
