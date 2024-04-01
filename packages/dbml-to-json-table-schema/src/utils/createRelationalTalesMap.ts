import { computeRelationalFieldKey } from "shared/utils/computeRelationalFieldKey";

import type Ref from "@dbml/core/types/model_structure/ref";

export const createRelationalTalesMap = (
  refs: Ref[],
): Map<string, Set<string>> => {
  let map = new Map<string, Set<string>>();

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
  map: Map<string, Set<string>>,
  fieldKey: string,
  tableToAdd: string,
): Map<string, Set<string>> => {
  const newMap = new Map<string, Set<string>>(map);

  if (newMap.has(fieldKey)) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const tablesSet = newMap.get(fieldKey)!;
    tablesSet.add(tableToAdd);
  } else {
    const tablesSet = new Set([tableToAdd]);
    newMap.set(fieldKey, tablesSet);
  }

  return newMap;
};
