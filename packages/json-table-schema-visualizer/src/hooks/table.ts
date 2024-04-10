import { useContext } from "react";

import type { TablesInfoProviderValue } from "@/types/tablesInfoProviderValue";

import { TablesInfoContext } from "@/providers/TablesInfoProvider";
import { TablesPositionsContext } from "@/providers/TablesPositionsProvider";

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
