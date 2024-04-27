import { createContext, useMemo, type PropsWithChildren } from "react";
import { type JSONTableTable } from "shared/types/tableSchema";

import type { TablesPositionsContextValue } from "@/types/dimension";

import computeTablesPositions from "@/utils/tablePositioning/computeTablesPositions";

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
    return computeTablesPositions(tables);
  }, []);

  return (
    <TablesPositionsContext.Provider value={{ tablesPositions }}>
      {children}
    </TablesPositionsContext.Provider>
  );
};

export default TablesPositionsProvider;
