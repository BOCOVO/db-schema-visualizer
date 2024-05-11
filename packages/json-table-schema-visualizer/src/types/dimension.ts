import type { XYPosition } from "./positions";

export interface Dimension {
  width: number;
  height: number;
}

export interface TablesPositionsContextValue {
  tablesPositions: Map<string, XYPosition>;
}
