export const hexToRgb = (color: string): number[] => {
  if (color.charAt(0) === "#") color = color.substring(1);

  const bigInt = parseInt(color, 16);
  const r = (bigInt >> 16) & 255;
  const g = (bigInt >> 8) & 255;
  const b = bigInt & 255;

  return [r, g, b];
};

export const isDarkColor = (color: string): boolean => {
  const [r, g, b] = hexToRgb(color);
  const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

  return hsp <= 127.5;
};
