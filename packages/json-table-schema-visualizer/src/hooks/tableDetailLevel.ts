import { useContext } from "react";

import { TableDetailLevelContext } from "@/providers/TableDetailLevelProvider";
import { type TableDetailLevel } from "@/types/tabelDetailLevel";

export const useTableDetailLevel = (): {
  detailLevel: TableDetailLevel;
  next: () => void;
} => {
  const contextValue = useContext(TableDetailLevelContext);
  if (contextValue === undefined) {
    throw new Error(
      "it seem you forgot to wrap your app with TableDetailLevelProvider",
    );
  }
  return contextValue;
};
