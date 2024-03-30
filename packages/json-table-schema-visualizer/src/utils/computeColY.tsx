import { COLS_OFFSET_Y_TO_COL_MIDDLE, COLUMN_HEIGHT } from "@/constants/sizing";
import type { RelationItem } from "@/types/relation";
import type { ColsIndexesMap } from "@/types/tablesInfoProviderValue";
import { computeColIndexesKey } from "./computeColIndexes";

export const computeColY = (
  colsIndexesMap: ColsIndexesMap,
  relation: RelationItem,
) => {
  const indexKey = computeColIndexesKey(
    relation.tableName,
    relation.fieldNames[0],
  );

  const colIndex = colsIndexesMap[indexKey] ?? 0;

  const colY = COLS_OFFSET_Y_TO_COL_MIDDLE + COLUMN_HEIGHT * colIndex;

  return colY;
};
