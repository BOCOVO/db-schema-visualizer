import { createRelationalTalesMap } from "../createRelationalTalesMap";

import type Ref from "@dbml/core/types/model_structure/ref";

import { dbmlTestCodeInJSONTableFormat } from "@/tests/data";

describe("create relational tables map", () => {
  test("create relational tables map", () => {
    const relationalTablesMap = createRelationalTalesMap([
      ...(dbmlTestCodeInJSONTableFormat.refs as unknown as Ref[]),
      ...(dbmlTestCodeInJSONTableFormat.refs as unknown as Ref[]),
    ]);

    const normalizedMap = new Map(
      Array.from(relationalTablesMap.entries()).map(([field, tables]) => [
        field,
        new Set(tables),
      ]),
    );

    expect(normalizedMap).toEqual(
      new Map([
        ["users.id", new Set(["follows"])],
        ["follows.following_user_id", new Set(["users"])],
      ]),
    );
  });
});
