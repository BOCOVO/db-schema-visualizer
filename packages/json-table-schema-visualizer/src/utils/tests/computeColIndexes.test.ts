import { computeColIndexes } from "../computeColIndexes";

import { exampleData } from "@/fake/fakeJsonTables";
import { TableDetailLevel } from "@/types/tableDetailLevel";

describe("compute cols index map", () => {
  test("compute cols index map", () => {
    expect(
      computeColIndexes(exampleData.tables, TableDetailLevel.FullDetails),
    ).toEqual({
      "users.id": 0,
      "users.email": 1,
      "bookings.booking_date": 2,
      "bookings.country": 1,
      "bookings.id": 0,
      "follows.created_at": 3,
      "follows.following_user_id": 2,
      "follows.id": 0,
      "follows.status": 4,
      "follows.view": 1,
    });
  });
});
