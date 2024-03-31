import { type JSONTableRef } from "shared/types/tableSchema";

export const getRefsSet = (refs: JSONTableRef[]): Set<string> => {
  const relationalAttrSet = new Set<string>();

  refs.forEach((ref) => {
    ref.endpoints.forEach((endpoint) => {
      endpoint.fieldNames.forEach((fieldName) => {
        relationalAttrSet.add(
          computeRelationalFieldKey(endpoint.tableName, fieldName),
        );
      });
    });
  });

  return relationalAttrSet;
};

export const computeRelationalFieldKey = (
  tableName: string,
  fieldName: string,
): string => {
  return `${tableName}.${fieldName}`;
};
