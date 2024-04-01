import { createEnumsSet } from "../createEnumsSet";
import { createRelationalTalesMap } from "../createRelationalTalesMap";

import { dbmlTableToJSONTableTable } from "./dbmlTableToJSONTableTable";

import { dbmlTestCodeInJSONTableFormat, parsedDBML } from "@/tests/data";

describe("transform dbml table to json table table", () => {
  test("transform table", () => {
    const enumSet = createEnumsSet(parsedDBML.enums);
    const relationalFieldMap = createRelationalTalesMap(parsedDBML.refs);
    expect(
      dbmlTableToJSONTableTable(
        parsedDBML.tables[0],
        relationalFieldMap,
        enumSet,
      ),
    ).toEqual(dbmlTestCodeInJSONTableFormat.tables[0]);
  });
});
