import { FIELD_DETAILS_CARET } from "@/constants/sizing";

export const computeCaretPoints = (
  startingX: number,
  colHeight: number,
): number[] => {
  const colHalf = colHeight / 2;
  const caretX2 = startingX + FIELD_DETAILS_CARET.w;
  return [startingX, colHalf, caretX2, colHalf - 5, caretX2, colHalf + 5];
};
