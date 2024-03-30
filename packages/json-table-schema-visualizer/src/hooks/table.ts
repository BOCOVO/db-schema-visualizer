import { useContext } from "react";

import type { TablesInfoProviderValue } from "@/types/tablesInfoProviderValue";

import { TablesInfoContext } from "@/providers/TablesInfoProvider";

export const useTablesInfo = (): TablesInfoProviderValue => {
  const tablesInfo = useContext(TablesInfoContext);

  if (tablesInfo == null) {
    throw new Error("useTablesInfo must be used within a TableInfoProvider");
  }

  return tablesInfo;
};
