import { createContext, type ReactNode, useMemo } from "react";
import { type JSONTableRef } from "shared/types/tableSchema";

import type { RelationalFieldsSetProviderValue } from "@/types/relation";

import { getRefsSet } from "@/utils/getRefsSet";

/**
 * this context hold relational fields
 */
export const RelationalFieldsSetContext =
  createContext<RelationalFieldsSetProviderValue | null>(null);

interface RelationalFieldsSetProviderProps {
  refs: JSONTableRef[];
  children: ReactNode;
}

const RelationalFieldsSetProvider = ({
  children,
  refs,
}: RelationalFieldsSetProviderProps) => {
  const relationalFields = useMemo(() => {
    return getRefsSet(refs);
  }, [refs]);

  return (
    <RelationalFieldsSetContext.Provider
      value={{ relationalFieldsSet: relationalFields }}
    >
      {children}
    </RelationalFieldsSetContext.Provider>
  );
};

export default RelationalFieldsSetProvider;
