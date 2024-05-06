import { computeTextsMaxWidth } from "../computeTextsMaxWidth";

import {
  TABLE_DEFAULT_MIN_WIDTH,
  TABLE_FIELD_TYPE_PADDING,
} from "@/constants/sizing";

export const computeTablePreferredWidth = (tableTexts: string[]): number => {
  const minW = computeTextsMaxWidth(tableTexts);

  return Math.max(minW + TABLE_FIELD_TYPE_PADDING * 2, TABLE_DEFAULT_MIN_WIDTH);
};
