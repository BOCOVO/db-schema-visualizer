import type { XYPosition } from "@/types/positions";

// to track tables position. react context do the job but it will
// require to have a lot of components memoization for better performance
export const tableCoords = new Map<string, XYPosition>();

class TableCoordsStore {
  private readonly tableCoords = new Map<string, XYPosition>();

  public getCoords(table: string): XYPosition {
    return this.tableCoords.get(table) ?? { x: 0, y: 0 };
  }

  public setCoords(table: string, coords: XYPosition): void {
    this.tableCoords.set(table, coords);
  }

  public remove(table: string): void {
    this.tableCoords.delete(table);
  }
}

export const tableCoordsStore = new TableCoordsStore();
