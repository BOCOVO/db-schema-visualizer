import { computeColY } from "./computeColY";

import { COLS_OFFSET_Y_TO_COL_MIDDLE } from "@/constants/sizing";
describe("computing col y", () => {
  test("computing col y", () => {
    expect(
      computeColY(
        { "users.email": 0 },
        { fieldNames: ["email"], relation: "1", tableName: "users" },
      ),
    ).toBe(COLS_OFFSET_Y_TO_COL_MIDDLE);
  });

  test("computing col y while index is missing in map", () => {
    expect(
      computeColY(
        { "users.email": 0 },
        { fieldNames: ["not-email"], relation: "1", tableName: "users" },
      ),
    ).toBe(COLS_OFFSET_Y_TO_COL_MIDDLE);
  });
});
