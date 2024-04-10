import { type JSONTableTable } from "shared/types/tableSchema";

import {
  COLUMN_HEIGHT,
  TABLE_HEADER_HEIGHT,
  TABLE_WIDTH,
} from "@/constants/sizing";
import { type Dimension } from "@/types/dimension";

export const computeTableDimension = (table: JSONTableTable): Dimension => {
  // use the default width for tables
  const width = TABLE_WIDTH;
  const height = TABLE_HEADER_HEIGHT + COLUMN_HEIGHT * table.fields.length;

  return { width, height };
};
