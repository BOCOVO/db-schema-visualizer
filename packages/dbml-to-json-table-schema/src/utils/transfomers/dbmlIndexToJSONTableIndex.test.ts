import { dbmlIndexToJSONTableIndex } from "./dbmlIndexToJSONTableIndex";

import { parsedDBML, dbmlTestCodeInJSONTableFormat } from "@/tests/data";
describe("transform dbml index to json table index", () => {
  test("transform index", () => {
    expect(dbmlIndexToJSONTableIndex(parsedDBML.tables[2].indexes[0])).toEqual(
      dbmlTestCodeInJSONTableFormat.tables[2].indexes[0],
    );
  });
});
