import { type JSONTableTable } from "shared/types/tableSchema";

import { getTableColorFromName } from "./colors/getTableColorFromName";
import { getContrastColor } from "./colors/getContrastColor";

import { type TableColors } from "@/types/tableColor";

export const createTablesColorMap = (
  tables: JSONTableTable[],
): Map<string, TableColors> => {
  const tableColors = new Map<string, TableColors>();
  tables.forEach((table) => {
    const tableColor = !!table.headerColor ? { regular: table.headerColor, lighter: getContrastColor(table.headerColor) } : getTableColorFromName(table.name);

    tableColors.set(table.name, tableColor);
  });

  return tableColors;
};
