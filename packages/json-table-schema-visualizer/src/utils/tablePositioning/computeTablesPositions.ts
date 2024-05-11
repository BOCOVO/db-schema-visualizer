import { type JSONTableTable } from "shared/types/tableSchema";

import { computeTableDimension } from "../computeTableDimension";

import { getColsNumber } from "./getColsNumber";

import { TABLES_GAP_X, TABLES_GAP_Y } from "@/constants/sizing";
import { type XYPosition } from "@/types/positions";

const computeTablesPositions = (
  tables: JSONTableTable[],
): Map<string, XYPosition> => {
  const colNumber = getColsNumber(tables.length);

  let nextColsY = 0;

  const tablesPositions = new Map<string, XYPosition>();
  let nextTableX = 0;

  for (let colIndex = 0; colIndex < colNumber; colIndex++) {
    let currentColMaxW = 0;

    const currentColX = nextTableX;

    for (
      let tableIndex = colIndex;
      tableIndex < tables.length;
      tableIndex += colNumber
    ) {
      const table = tables[tableIndex];
      const colY = nextColsY ?? 0;

      tablesPositions.set(table.name, { x: currentColX, y: colY });

      const tableDimension = computeTableDimension(table);
      const isLastTableInCol = tableIndex + colNumber > tables.length - 1;
      nextColsY = isLastTableInCol
        ? 0
        : colY + tableDimension.height + TABLES_GAP_Y;

      currentColMaxW = Math.max(tableDimension.width, currentColMaxW);

      nextTableX = isLastTableInCol
        ? currentColMaxW + TABLES_GAP_X + currentColX
        : currentColX;
    }
  }

  return tablesPositions;
};

export default computeTablesPositions;
