import { type JSONTableTable } from "shared/types/tableSchema";

import { computeTableDimension } from "../computeTableDimension";

import { getColsNumber } from "./getColsNumber";

import { TABLES_GAP_X, TABLES_GAP_Y } from "@/constants/sizing";

const computeTablesPositions = (
  tables: JSONTableTable[],
): Map<string, [number, number]> => {
  const colNumber = getColsNumber(tables.length);

  const nextColsY = new Map<number, number>();

  let nextTableX = 0;

  const tablesPositions = new Map<string, [number, number]>();

  tables.forEach((table, index) => {
    const colIndex = index % colNumber;
    const colY = nextColsY.get(colIndex) ?? 0;

    tablesPositions.set(table.name, [nextTableX, colY]);

    const tableDimension = computeTableDimension(table);
    const nextColY = colY + tableDimension.height + TABLES_GAP_Y;
    nextColsY.set(colIndex, nextColY);

    nextTableX =
      colIndex === colNumber - 1
        ? 0
        : nextTableX + tableDimension.width + TABLES_GAP_X;
  });

  return tablesPositions;
};

export default computeTablesPositions;
