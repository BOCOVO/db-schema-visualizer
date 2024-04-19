import { computeRelationalFieldKey } from "shared/utils/computeRelationalFieldKey";

import type Ref from "@dbml/core/types/model_structure/ref";

export const createRelationalTalesMap = (
  refs: Ref[],
): Map<string, string[]> => {
  let map = new Map<string, string[]>();

  refs.forEach((ref) => {
    const [sourceEndpoint, targetEndpoint] = ref.endpoints;
    const sourceFieldKey = computeRelationalFieldKey(
      sourceEndpoint.tableName,
      sourceEndpoint.fieldNames[0],
    );
    map = appendRelationalTablesMap(
      map,
      sourceFieldKey,
      targetEndpoint.tableName,
    );

    const targetFieldKey = computeRelationalFieldKey(
      targetEndpoint.tableName,
      targetEndpoint.fieldNames[0],
    );
    map = appendRelationalTablesMap(
      map,
      targetFieldKey,
      sourceEndpoint.tableName,
    );
  });

  return map;
};

const appendRelationalTablesMap = (
  map: Map<string, string[]>,
  fieldKey: string,
  tableToAdd: string,
): Map<string, string[]> => {
  const newMap = new Map<string, string[]>(map);

  if (newMap.has(fieldKey)) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const tablesSet = newMap.get(fieldKey)!;
    tablesSet.push(tableToAdd);
  } else {
    const tablesSet = [tableToAdd];
    newMap.set(fieldKey, tablesSet);
  }

  return newMap;
};
