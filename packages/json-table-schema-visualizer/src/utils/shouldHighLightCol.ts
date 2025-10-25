/* eslint-disable @typescript-eslint/strict-boolean-expressions */
export const shouldHighLightCol = (
  hovered: boolean,
  tableName: string | null,
  hoveredTable: string | null,
  highlightedColumn: string | null,
  columnName: string | null,
  relationalTables?: string[] | null,
): boolean => {
  if (hovered) {
    return true;
  }

  const columnKey =
    tableName != null && columnName != null
      ? `${tableName}.${columnName}`
      : null;

  if (
    highlightedColumn != null &&
    columnKey != null &&
    highlightedColumn === columnKey
  ) {
    return true;
  }

  if (hoveredTable === tableName && !!relationalTables) {
    return true;
  }

  if (!!hoveredTable && relationalTables?.includes(hoveredTable)) {
    return true;
  }

  return false;
};
