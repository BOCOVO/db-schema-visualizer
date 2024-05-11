import { PersistableStore } from "./PersitableStore";

import type { XYPosition } from "@/types/positions";

// to track tables position. react context do the job but it will
// require to have a lot of components memoization for better performance

class TableCoordsStore extends PersistableStore<Array<[string, XYPosition]>> {
  private tableCoords = new Map<string, XYPosition>();
  private currentStoreKey = "none";

  constructor() {
    super("tableCoords");
  }

  public getCurrentStoreValue(): Map<string, XYPosition> {
    return this.tableCoords;
  }

  public saveCurrentStore(): void {
    // convert the map object to array before store it
    const storeValue = Array.from(this.tableCoords);

    this.persist(this.currentStoreKey, storeValue);
  }

  public switchTo(newStoreKey: string): void {
    this.saveCurrentStore();

    this.currentStoreKey = newStoreKey;
    const recoveredStore = this.retrieve(this.currentStoreKey) as Array<
      [string, XYPosition]
    >;
    if (recoveredStore === null || !Array.isArray(recoveredStore)) {
      this.tableCoords = new Map<string, XYPosition>();
    }

    this.tableCoords = new Map<string, XYPosition>(recoveredStore);
  }

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
