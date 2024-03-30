import type { ColsIndexesMap } from "@/types//tablesInfoProviderValue";
import type { JSONTableTable } from "shared/types/tableSchema";

export const computeColIndexes = (tables: JSONTableTable[]): ColsIndexesMap => {
  return tables.reduce<ColsIndexesMap>((acc, table) => {
    const currentTableColsIndexes = table.fields.reduce<ColsIndexesMap>(
      (tableAcc, field, index) => {
        return {
          ...tableAcc,
          [computeColIndexesKey(table.name, field.name)]: index,
        };
      },
      {},
    );

    return {
      ...acc,
      ...currentTableColsIndexes,
    };
  }, {});
};

export const computeColIndexesKey = (
  tableName: string,
  attr: string,
): string => {
  return `${tableName}.${attr}`;
};
