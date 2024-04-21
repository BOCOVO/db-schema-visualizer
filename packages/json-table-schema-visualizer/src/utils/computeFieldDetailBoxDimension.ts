import { type JSONTableEnum } from "shared/types/tableSchema";

import { computeEnumDetailBoxMaxW } from "./computeEnumDetailBoxMaxW";
import {
  computeTextSize,
  getLetterApproximateDimension,
} from "./computeTextSize";
import { estimateSentenceLineCount } from "./estimateSentenceLineCount";

import { FIELD_DETAILS_TOOLTIPS_W, PADDINGS } from "@/constants/sizing";

export const computeFieldDetailBoxDimension = (
  note?: string,
  enumObject?: JSONTableEnum,
): { w: number; h: number; noteH: number } => {
  const enumDetailMaxW =
    enumObject === undefined ? 0 : computeEnumDetailBoxMaxW(enumObject);
  const oneLineNoteW = note != null ? computeTextSize(note).width : 0;
  const preferredWidth = Math.max(enumDetailMaxW, oneLineNoteW) + PADDINGS.md;
  const finalWidth = Math.min(preferredWidth, FIELD_DETAILS_TOOLTIPS_W);

  const letterApproximateDim = getLetterApproximateDimension();
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  const noteH = note
    ? estimateSentenceLineCount(note, finalWidth) * letterApproximateDim.height
    : 0;

  const enumsDetailsH =
    enumObject === undefined
      ? 0
      : letterApproximateDim.height *
        (1 + enumObject.values.length); /* the 1 added is for the title line */

  const enumsPanelHWithPadding =
    enumsDetailsH + (enumsDetailsH > 0 ? PADDINGS.md : 0);

  const noteHWithPadding = noteH + (noteH !== 0 ? PADDINGS.lg : PADDINGS.md);
  const totalH = noteHWithPadding + enumsPanelHWithPadding;

  return { w: finalWidth, h: totalH, noteH: noteHWithPadding };
};
