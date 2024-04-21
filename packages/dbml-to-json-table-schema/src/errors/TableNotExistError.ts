export class TableNotExistError extends Error {
  constructor(tableName: string) {
    super(`Table ${tableName} does not exist.`);
  }
}
