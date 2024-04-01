import { createEnumsSet } from "../createEnumsSet";
import { createRelationalTalesMap } from "../createRelationalTalesMap";

import { dbmlFieldToJSONTableField } from "./dbmlFieldToJSONTableField";

import { dbmlTestCodeInJSONTableFormat, parsedDBML } from "@/tests/data";

describe("transform dbml field to json table field", () => {
  const enumsSet = createEnumsSet(parsedDBML.enums);
    const relationalFieldMap = createRelationalTalesMap(parsedDBML.refs);
    const table = parsedDBML.tables[0];
    
  test("transform simple field", () => {
    const field = table.fields[0];

    expect(
      dbmlFieldToJSONTableField({
        field,
        enumsSet,
        ownerTable: table.name,
        relationalFieldMap,
      }),
    ).toEqual(dbmlTestCodeInJSONTableFormat.tables[0].fields[0]);
  });

  test("transform relational field", () => {
    const field = table.fields[2];

    expect(
      dbmlFieldToJSONTableField({
        field,
        enumsSet,
        ownerTable: table.name,
        relationalFieldMap,
      }),
    ).toEqual(dbmlTestCodeInJSONTableFormat.tables[0].fields[2]);
  });

  test("transform enum field", () => {
    const field = table.fields[4];

    expect(
      dbmlFieldToJSONTableField({
        field,
        enumsSet,
        ownerTable: table.name,
        relationalFieldMap,
      }),
    ).toEqual(dbmlTestCodeInJSONTableFormat.tables[0].fields[4]);
  });
});
