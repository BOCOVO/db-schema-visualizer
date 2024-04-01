import { dbmlEnumToJSONTableEnum } from "./dbmlEnumToJSONTableEnum";

import { dbmlTestCodeInJSONTableFormat, parsedDBML } from "@/tests/data";

describe("transform dbml enum to json table enum", () => {
  test("transform enum", () => {
    expect(dbmlEnumToJSONTableEnum(parsedDBML.enums[0])).toEqual(
      dbmlTestCodeInJSONTableFormat.enums[0],
    );
  });
});
