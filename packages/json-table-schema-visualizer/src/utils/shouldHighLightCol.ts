/* eslint-disable @typescript-eslint/strict-boolean-expressions */
export const shouldHighLightCol = (
  hovered: boolean,
  tableName: string | null,
  hoveredTable: string | null,
  highlightedColumns: string[],
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
    columnKey != null &&
    highlightedColumns?.some((key) => key === columnKey)
  ) {
    return true;
  }

  const hasExplicitHighlights =
    Array.isArray(highlightedColumns) && highlightedColumns.length > 0;

  if (hasExplicitHighlights && hoveredTable == null) {
    return false;
  }

  if (hoveredTable === tableName && !!relationalTables) {
    return true;
  }

  if (!!hoveredTable && relationalTables?.includes(hoveredTable)) {
    return true;
  }

  return false;
};
