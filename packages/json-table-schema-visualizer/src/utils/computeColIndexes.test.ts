import { describe, test, expect } from "@jest/globals";

import { computeColIndexes } from "./computeColIndexes";

import { exampleData } from "@/fake/fakeJsonTables";

describe("compute cols index map", () => {
  test("compute cols index map", () => {
    expect(computeColIndexes(exampleData.tables)).toEqual({
      "follows.following_user_id": 0,
      "follows.created_at": 1,
      "users.id": 0,
      "users.email": 1,
    });
  });
});
