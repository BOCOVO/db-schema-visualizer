/* eslint-disable @typescript-eslint/strict-boolean-expressions */
export const shouldHighLightCol = (
  hovered: boolean,
  tableName: string | null,
  hoveredTable: string | null,
  relationalTables?: Set<string> | null,
): boolean => {
  if (hovered) {
    return true;
  }

  if (hoveredTable === tableName && !!relationalTables) {
    return true;
  }

  if (
    !!relationalTables &&
    !!hoveredTable &&
    relationalTables.has(hoveredTable)
  ) {
    return true;
  }

  return false;
};
