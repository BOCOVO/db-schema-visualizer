import { type JSONTableEnum } from "shared/types/tableSchema";

import { computeTextsMaxWidth } from "./computeTextsMaxWidth";

export const computeEnumDetailBoxMaxW = (enumObject: JSONTableEnum): number => {
  const titleText = `Enum ${enumObject.name}`;
  const itemsTexts = enumObject.values.map((item) => ` - ${item.name}`);
  return computeTextsMaxWidth([titleText, ...itemsTexts]);
};
