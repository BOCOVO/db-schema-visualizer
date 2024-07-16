import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  type TableDetailLevelValue,
  TableDetailLevel,
} from "@/types/tabelDetailLevel";
import { detailLevelStore } from "@/stores/detailLevelStore";

export const TableDetailLevelContext = createContext<TableDetailLevelValue>({
  detailLevel: TableDetailLevel.FullDetails,
  next() {},
});

interface TabelLevelDetailProviderProps {
  children: ReactNode;
  level?: TableDetailLevel;
}

const TabelLevelDetailProvider = ({
  children,
}: TabelLevelDetailProviderProps) => {
  const [state, setState] = useState(detailLevelStore.getCurrentDetailLevel());
  useEffect(() => {
    if (state !== detailLevelStore.getCurrentDetailLevel()) {
      detailLevelStore.set(state);
      detailLevelStore.saveCurrentState();
    }
  }, [state]);
  const next = useCallback((): void => {
    if (state === TableDetailLevel.FullDetails) {
      setState(TableDetailLevel.HeaderOnly);
    } else if (state === TableDetailLevel.HeaderOnly) {
      setState(TableDetailLevel.KeyOnly);
    } else {
      setState(TableDetailLevel.FullDetails);
    }
  }, [state, setState]);
  return (
    <TableDetailLevelContext.Provider value={{ detailLevel: state, next }}>
      {children}
    </TableDetailLevelContext.Provider>
  );
};

export default TabelLevelDetailProvider;
