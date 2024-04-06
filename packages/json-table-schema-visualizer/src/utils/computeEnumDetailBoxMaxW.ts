import { type JSONTableEnum } from "shared/types/tableSchema";

import { computeTextsMaxWidth } from "./computeTextsMaxWidth";
import { createEnumItemText } from "./createEnumItemText";

/**
 * compute and return the max width of the enum.
 * Compares the text width of the enum title with the text widths of each menu item
 *
 * @param {JSONTableEnum} enumObject - The enum object to compute the detail box width for
 * @return {number} The maximum width of the detail box
 */
export const computeEnumDetailBoxMaxW = (enumObject: JSONTableEnum): number => {
  const titleText = `Enum ${enumObject.name}`;
  const itemsTexts = enumObject.values.map((item) =>
    createEnumItemText(item.name),
  );
  return computeTextsMaxWidth([titleText, ...itemsTexts]);
};
