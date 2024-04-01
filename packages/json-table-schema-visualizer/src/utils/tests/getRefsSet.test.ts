import { getRefsSet } from "../getRefsSet";

import { exampleData } from "@/fake/fakeJsonTables";

describe("create set object for relational fields", () => {
  test("should create set", () => {
    expect(getRefsSet(exampleData.refs)).toEqual(
      new Set(["users.id", "follows.following_user_id"]),
    );
  });
});
