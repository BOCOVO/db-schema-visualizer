const defaultPickConfig: Record<string, 0 | 1> = {
  // refs
  "refs.name": 1,

  // refs endpoints
  "refs.endpoints.relation": 1,
  "refs.endpoints.tableName": 1,
  "refs.endpoints.fieldNames": 1,

  // enums
  "enums.name": 1,

  // enums values
  "enums.values.name": 1,
  "enums.values.note": 1,

  // tables
  "tables.id": 1,
  "tables.name": 1,
  "tables.note": 1,

  // tables fields
  "tables.fields.name": 1,
  "tables.fields.type.type_name": 1,
  "tables.fields.pk": 1,
  "tables.fields.unique": 1,
  "tables.fields.note": 1,
  "tables.fields.increment": 1,
  "tables.fields.not_null": 1,
  "tables.fields.dbdefault": 1,

  // tables indexes
  "tables.indexes.unique": 1,
  "tables.indexes.type": 1,
  "tables.indexes.pk": 1,
  "tables.indexes.name": 1,
  "tables.indexes.note": 1,

  // tables indexes columns
  "tables.indexes.columns.type": 1,
  "tables.indexes.columns.value": 1,
};

export default defaultPickConfig;