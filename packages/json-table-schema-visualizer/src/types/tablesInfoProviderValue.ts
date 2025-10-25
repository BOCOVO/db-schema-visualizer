export type ColsIndexesMap = Record<string, number>;

export interface TablesInfoProviderValue {
  colsIndexes: ColsIndexesMap;
  hoveredTableName: string | null;
  setHoveredTableName: (tableName: string | null) => void;
  highlightedColumn: string | null;
  setHighlightedColumn: (columnKey: string | null) => void;
}
