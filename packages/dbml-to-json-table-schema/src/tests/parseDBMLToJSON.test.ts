

import { parseDBMLToJSON } from "../index";

import {
  dbmlSchemaWithIndexes,
  onlyTablesSchemaDBMLCode,
  onlyTablesSchemaJSON,
  withEnumDBMLCode,
  withEnumJSON,
  withIndexesJSON,
  withRelationsAndUniquenessDBMLCode,
  withRelationsAndUniquenessJSON,
} from "./data";

describe("transform dbml to json table schema", () => {
  test("only tables", () => {
    expect(parseDBMLToJSON(onlyTablesSchemaDBMLCode)).toEqual(
      onlyTablesSchemaJSON
    );
  });

  test("with enums", () => {
    expect(parseDBMLToJSON(withEnumDBMLCode)).toEqual(withEnumJSON);
  });

  test("with relations", () => {
    expect(parseDBMLToJSON(withRelationsAndUniquenessDBMLCode)).toEqual(
      withRelationsAndUniquenessJSON
    );
  });

  test("with indexes", () => {
    expect(parseDBMLToJSON(dbmlSchemaWithIndexes)).toEqual(
      withIndexesJSON
    );
  });
});
