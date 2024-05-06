import { useContext, useMemo } from "react";
import { type JSONTableTable } from "shared/types/tableSchema";

import type { TablesInfoProviderValue } from "@/types/tablesInfoProviderValue";

import { TablesInfoContext } from "@/providers/TablesInfoProvider";
import { TablesPositionsContext } from "@/providers/TablesPositionsProvider";
import { TableDimensionContext } from "@/providers/TableDimension";
import { TABLE_DEFAULT_MIN_WIDTH } from "@/constants/sizing";
import { getTableLinesText } from "@/utils/tableWComputation/getTableLinesText";
import { computeTablePreferredWidth } from "@/utils/tableWComputation/computeTablePreferredWidth";
import { tableWidthStore } from "@/stores/tableWidth";

export const useTablesInfo = (): TablesInfoProviderValue => {
  const tablesInfo = useContext(TablesInfoContext);

  if (tablesInfo == null) {
    throw new Error("useTablesInfo must be used within a TableInfoProvider");
  }

  return tablesInfo;
};

export const useTablePosition = (tableName: string): [number, number] | [] => {
  const tablesPositionsMap = useContext(TablesPositionsContext);

  if (tablesPositionsMap == null) {
    throw new Error(
      "useTablePosition must be used within the TablesPositionsContext",
    );
  }

  return tablesPositionsMap.tablesPositions.get(tableName) ?? [];
};

export const useGetTableMinWidth = (table: JSONTableTable): number => {
  const tableLinesTexts = getTableLinesText(table.fields, table.name);
  const minWidth = useMemo(() => {
    const minW = computeTablePreferredWidth(tableLinesTexts);
    tableWidthStore.setWidth(table.name, minW);
    return minW;
  }, [tableLinesTexts]);

  return minWidth;
};

export const useTableWidth = (): number => {
  const contextValue = useContext(TableDimensionContext);

  return contextValue?.width ?? TABLE_DEFAULT_MIN_WIDTH;
};
