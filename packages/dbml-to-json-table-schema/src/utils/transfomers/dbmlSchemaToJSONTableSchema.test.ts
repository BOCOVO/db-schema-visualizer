import { dbmlSchemaToJSONTableSchema } from "./dbmlSchemaToJSONTableSchema";

import { dbmlTestCodeInJSONTableFormat, parsedDBML } from "@/tests/data";

type SchemaResult = ReturnType<typeof dbmlSchemaToJSONTableSchema>;
type TableResult = SchemaResult["tables"][number];
type FieldResult = TableResult["fields"][number];
type IndexResult = TableResult["indexes"][number];

const normalizeField = (field: FieldResult): unknown => {
  if (Array.isArray(field.relational_tables)) {
    return {
      ...field,
      relational_tables: new Set(field.relational_tables),
    } as any;
  }

  return field;
};

const normalizeIndex = (index: IndexResult): unknown => {
  if (typeof index.pk === "boolean" && !index.pk) {
    const { pk: _removed, ...rest } = index;
    return rest as any;
  }

  return index;
};

const normalizeTable = (table: TableResult): unknown => {
  const withNormalizedFieldsAndIndexes = {
    ...table,
    fields: table.fields.map((field) => normalizeField(field)),
    indexes: table.indexes.map((index) => normalizeIndex(index)),
  } as any;

  if (withNormalizedFieldsAndIndexes.headerColor === undefined) {
    const { headerColor: _removed, ...rest } = withNormalizedFieldsAndIndexes;
    return rest;
  }

  return withNormalizedFieldsAndIndexes;
};

const normalizeSchema = (schema: SchemaResult): unknown => ({
  ...schema,
  tables: schema.tables.map((table) => normalizeTable(table)),
});

describe("transform dbml schema to json table schema", () => {
  test("transform dbml schema to json table schema", () => {
    expect(normalizeSchema(dbmlSchemaToJSONTableSchema(parsedDBML))).toEqual(
      dbmlTestCodeInJSONTableFormat,
    );
  });
});
