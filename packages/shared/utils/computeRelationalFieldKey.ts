export const computeRelationalFieldKey = (
  tableName: string,
  fieldName: string,
): string => {
  return `${tableName}.${fieldName}`;
};
