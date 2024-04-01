import { dbmlIndexColToJSONTableIndexCol } from "./dbmlIndexColToJSONTableIndexCol";

import { parsedDBML } from "@/tests/data";

describe("transform dbml index column to json table index column", () => {
  test("transform index column", () => {
    expect(
      dbmlIndexColToJSONTableIndexCol(
        parsedDBML.tables[2].indexes[0].columns[0],
      ),
    ).toEqual({
      type: "column",
      value: "id",
    });
  });
});
