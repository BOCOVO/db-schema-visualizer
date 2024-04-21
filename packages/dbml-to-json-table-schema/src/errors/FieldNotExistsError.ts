export class FieldNotExistsError extends Error {
  constructor(fieldName: string, tableName: string) {
    super(`Field ${fieldName} does not exist in table ${tableName}`);
  }
}
