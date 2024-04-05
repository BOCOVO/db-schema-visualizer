import { computeTextSize } from "./computeTextSize";

export const computeTextsMaxWidth = (text: string[]): number => {
  return Math.max(...text.map((t) => computeTextSize(t).width));
};
