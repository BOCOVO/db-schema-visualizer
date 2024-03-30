import { createContext, type ReactNode } from "react";

import type { TablesInfoProviderValue } from "@/types/tablesInfoProviderValue";
import type { JSONTableTable } from "shared/types/tableSchema";

import { computeColIndexes } from "@/utils/computeColIndexes";

export const TablesInfoContext = createContext<
  TablesInfoProviderValue | undefined
>(undefined);

interface TablesInfoProviderProps {
  tables: JSONTableTable[];
  children: ReactNode;
}

const TablesInfoProvider = ({ children, tables }: TablesInfoProviderProps) => {
  const colsIndexes = computeColIndexes(tables);

  return (
    <TablesInfoContext.Provider value={{ colsIndexes }}>
      {children}
    </TablesInfoContext.Provider>
  );
};

export default TablesInfoProvider;
