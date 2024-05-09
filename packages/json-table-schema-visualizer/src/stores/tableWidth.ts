import { StoreSignal } from "./StoreSignal";

class TableWidthStore extends StoreSignal<number> {
  private readonly tableWidths = new Map<string, number>();

  constructor() {
    super("tableWidth");
  }

  public getWidth(tableName: string): number | undefined {
    return this.tableWidths.get(tableName);
  }

  public setWidth(table: string, width: number): void {
    this.tableWidths.set(table, width);
    this.emit(table, width);
  }

  public remove(table: string): void {
    this.tableWidths.delete(table);
  }
}

export const tableWidthStore = new TableWidthStore();
