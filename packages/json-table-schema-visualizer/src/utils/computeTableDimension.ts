import { type JSONTableTable } from "shared/types/tableSchema";

import { getTableLinesText } from "./tableWComputation/getTableLinesText";
import { computeTablePreferredWidth } from "./tableWComputation/computeTablePreferredWidth";

import { COLUMN_HEIGHT, TABLE_HEADER_HEIGHT } from "@/constants/sizing";
import { type Dimension } from "@/types/dimension";

export const computeTableDimension = (table: JSONTableTable): Dimension => {
  const tableTexts = getTableLinesText(table.fields);
  const width = computeTablePreferredWidth(tableTexts, table.name);
  const height = TABLE_HEADER_HEIGHT + COLUMN_HEIGHT * table.fields.length;

  return { width, height };
};
