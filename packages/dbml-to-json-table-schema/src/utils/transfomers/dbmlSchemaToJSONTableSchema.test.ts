import { dbmlSchemaToJSONTableSchema } from "./dbmlSchemaToJSONTableSchema";

import { dbmlTestCodeInJSONTableFormat, parsedDBML } from "@/tests/data";

describe("transform dbml schema to json table schema", () => {
  test("transform dbml schema to json table schema", () => {
    expect(dbmlSchemaToJSONTableSchema(parsedDBML)).toEqual(
      dbmlTestCodeInJSONTableFormat,
    );
  });
});
