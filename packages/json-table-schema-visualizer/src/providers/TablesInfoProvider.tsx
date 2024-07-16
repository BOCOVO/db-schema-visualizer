import { createContext, useState, type ReactNode } from "react";

import type { TablesInfoProviderValue } from "@/types/tablesInfoProviderValue";
import type { JSONTableTable } from "shared/types/tableSchema";

import { computeColIndexes } from "@/utils/computeColIndexes";
import { useTableDetailLevel } from "@/hooks/tableDetailLevel";

export const TablesInfoContext = createContext<
  TablesInfoProviderValue | undefined
>(undefined);

interface TablesInfoProviderProps {
  tables: JSONTableTable[];
  children: ReactNode;
}

const TablesInfoProvider = ({ children, tables }: TablesInfoProviderProps) => {
  const [hoveredTableName, setHoveredTableName] = useState<string | null>(null);
  const { detailLevel } = useTableDetailLevel();
  const colsIndexes = computeColIndexes(tables, detailLevel);

  return (
    <TablesInfoContext.Provider
      value={{ colsIndexes, hoveredTableName, setHoveredTableName }}
    >
      {children}
    </TablesInfoContext.Provider>
  );
};

export default TablesInfoProvider;
