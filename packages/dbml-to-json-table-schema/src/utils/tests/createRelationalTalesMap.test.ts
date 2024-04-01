import { createRelationalTalesMap } from "../createRelationalTalesMap";

import type Ref from "@dbml/core/types/model_structure/ref";

import { dbmlTestCodeInJSONTableFormat } from "@/tests/data";


describe("create relational tables map", () => {
  test("create relational tables map", () => {
    expect(
      createRelationalTalesMap([
        ...(dbmlTestCodeInJSONTableFormat.refs as unknown as Ref[]),
        ...(dbmlTestCodeInJSONTableFormat.refs as unknown as Ref[]),
      ]),
    ).toEqual(
      new Map([
        ["users.id", new Set(["follows"])],
        ["follows.following_user_id", new Set(["users"])],
      ]),
    );
  });
});
