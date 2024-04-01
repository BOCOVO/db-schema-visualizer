import { dbmlRefToJSONTableRef } from "./dbmlRefToJSONTableRef";

import { dbmlTestCodeInJSONTableFormat, parsedDBML } from "@/tests/data";

describe("transform dbml ref to json table ref", () => {
  test("transform ref", () => {
    expect(dbmlRefToJSONTableRef(parsedDBML.refs[0])).toEqual(
      dbmlTestCodeInJSONTableFormat.refs[0],
    );
  });
});
