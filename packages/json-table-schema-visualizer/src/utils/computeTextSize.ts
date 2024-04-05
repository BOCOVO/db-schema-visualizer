import { Text, type TextConfig } from "konva/lib/shapes/Text";

import { FONT_FAMILY } from "@/constants/font";
import { FONT_SIZES } from "@/constants/sizing";
import { type Dimension } from "@/types/dimension";

const textNode = new Text({
  fontFamily: FONT_FAMILY,
  fontSize: FONT_SIZES.md,
});

export const computeTextSize = (
  text: string,
  config?: TextConfig,
): Dimension => {
  if (config != null) {
    const clone = textNode.clone(config);
    return clone.measureSize(text);
  }

  return textNode.measureSize(text);
};

export const getLetterApproximateDimension = (
  config?: TextConfig,
): Dimension => {
  return computeTextSize("a", config);
};
