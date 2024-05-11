import { createContext, useMemo, type PropsWithChildren } from "react";
import { type JSONTableTable } from "shared/types/tableSchema";

import type { TablesPositionsContextValue } from "@/types/dimension";

import computeTablesPositions from "@/utils/tablePositioning/computeTablesPositions";
import { tableCoordsStore } from "@/stores/tableCoords";

export const TablesPositionsContext =
  createContext<TablesPositionsContextValue | null>(null);

interface TablesPositionsProviderProps extends PropsWithChildren {
  tables: JSONTableTable[];
}

const TablesPositionsProvider = ({
  tables,
  children,
}: TablesPositionsProviderProps) => {
  const tablesPositions = useMemo(() => {
    const existingPositions = tableCoordsStore.getCurrentStoreValue();
    if (existingPositions.size !== tables.length) {
      // TODO improve checking, maybe ensure all table is present in the store before
      return computeTablesPositions(tables);
    }

    return new Map(existingPositions);
  }, []);

  return (
    <TablesPositionsContext.Provider value={{ tablesPositions }}>
      {children}
    </TablesPositionsContext.Provider>
  );
};

export default TablesPositionsProvider;
