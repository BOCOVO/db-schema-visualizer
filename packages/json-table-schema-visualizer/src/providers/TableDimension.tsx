import { createContext, useMemo, type ReactNode } from "react";

import type { TableDimensionProviderValue } from "@/types/table";

export const TableDimensionContext = createContext<
  TableDimensionProviderValue | undefined
>(undefined);

interface TablesInfoProviderProps {
  width: number;
  children: ReactNode;
}

// only store the width of the table at this time
const TableDimensionProvider = ({
  children,
  width,
}: TablesInfoProviderProps) => {
  const contextValue = useMemo(() => {
    return { width };
  }, [width]);

  return (
    <TableDimensionContext.Provider value={contextValue}>
      {children}
    </TableDimensionContext.Provider>
  );
};

export default TableDimensionProvider;
