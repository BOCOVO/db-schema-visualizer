import { createEnumsSet } from "../createEnumsSet";

import type Enum from "@dbml/core/types/model_structure/enum";

import { dbmlTestCodeInJSONTableFormat } from "@/tests/data";

describe("create enums set", () => {
  test("create enums set", () => {
    expect(createEnumsSet(dbmlTestCodeInJSONTableFormat.enums as Enum[])).toEqual(
      new Set(["status"]),
    );
  });
});
