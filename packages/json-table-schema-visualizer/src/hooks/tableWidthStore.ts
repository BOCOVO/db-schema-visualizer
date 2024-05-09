import { useSyncExternalStore } from "react";

import { tableWidthStore } from "@/stores/tableWidth";

export const useTableWidthStoredValue = (tableName: string): number => {
  const registerSubscriber = (callback: (w: number) => void): (() => void) => {
    tableWidthStore.subscribe(tableName, callback);

    // return function that unsubscribe
    return () => {
      tableWidthStore.unSubscribe(tableName, callback);
    };
  };

  const getCurrentValue = (): number =>
    tableWidthStore.getWidth(tableName) ?? 0;

  const width = useSyncExternalStore(registerSubscriber, getCurrentValue);

  return width;
};
