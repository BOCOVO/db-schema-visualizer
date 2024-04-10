import { computeTableDimension } from "../computeTableDimension";

import { exampleData } from "@/fake/fakeJsonTables";
import { TABLE_HEADER_HEIGHT, TABLE_WIDTH } from "@/constants/sizing";

describe("compute table dimension", () => {
  test("compute table dimension", () => {
    expect(computeTableDimension(exampleData.tables[0])).toEqual({
      width: TABLE_WIDTH,
      height: TABLE_HEADER_HEIGHT * 5,
    });
  });
});
