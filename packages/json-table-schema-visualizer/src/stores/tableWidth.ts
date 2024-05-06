class TableWidthStore {
  private readonly tableWidths = new Map<string, number>();

  public getWidth(tableName: string): number | undefined {
    return this.tableWidths.get(tableName);
  }

  public setWidth(table: string, width: number): void {
    this.tableWidths.set(table, width);
  }

  public remove(table: string): void {
    this.tableWidths.delete(table);
  }
}

export const tableWidthStore = new TableWidthStore();
