import { createContext, type ReactNode } from "react";
import { type JSONTableEnum } from "shared/types/tableSchema";

import { type EnumsContextValue } from "@/types/enums";

export const EnumsContext = createContext<EnumsContextValue | null>(null);

interface EnumsProviderProps {
  children: ReactNode;
  enums: JSONTableEnum[];
}
const EnumsProvider = ({ children, enums }: EnumsProviderProps) => {
  return (
    <EnumsContext.Provider value={{ enums }}>{children}</EnumsContext.Provider>
  );
};

export default EnumsProvider;
