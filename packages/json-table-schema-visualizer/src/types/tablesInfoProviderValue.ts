export type ColsIndexesMap = Record<string, number>;

export interface TablesInfoProviderValue {
  colsIndexes: ColsIndexesMap;
  hoveredTableName: string | null;
  setHoveredTableName: (tableName: string | null) => void;
  highlightedColumns: string[];
  setHighlightedColumns: (columnKeys: string[]) => void;
}
