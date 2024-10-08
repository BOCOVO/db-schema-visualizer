import { createContext, useMemo, type PropsWithChildren } from "react";

import type { JSONTableRef, JSONTableTable } from "shared/types/tableSchema";
import type { TablesPositionsContextValue } from "@/types/dimension";

import { tableCoordsStore } from "@/stores/tableCoords";

export const TablesPositionsContext =
  createContext<TablesPositionsContextValue | null>(null);

interface TablesPositionsProviderProps extends PropsWithChildren {
  tables: JSONTableTable[];
  refs: JSONTableRef[];
}

const TablesPositionsProvider = ({
  tables,
  refs,
  children,
}: TablesPositionsProviderProps) => {
  const resetPositions = () => {
    tableCoordsStore.resetPositions(tables, refs);
  };

  const contextValue = useMemo(() => ({ resetPositions }), [resetPositions]);

  return (
    <TablesPositionsContext.Provider value={contextValue}>
      {children}
    </TablesPositionsContext.Provider>
  );
};

export default TablesPositionsProvider;
