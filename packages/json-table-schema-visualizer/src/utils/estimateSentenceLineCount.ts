import { computeTextSize } from "./computeTextSize";

export const estimateSentenceLineCount = (
  sentence: string,
  containerW: number,
): number => {
  let numberOfLine = 1;
  let accumulatedWidth = 0;

  sentence.split(" ").forEach((word) => {
    const wordW = computeTextSize(`${word}-`).width;
    accumulatedWidth += wordW;
    if (accumulatedWidth > containerW) {
      const approximateLineForTheWord = Math.ceil(wordW / containerW);
      numberOfLine += approximateLineForTheWord;
      accumulatedWidth = 0;
    }
  });

  return numberOfLine;
};
