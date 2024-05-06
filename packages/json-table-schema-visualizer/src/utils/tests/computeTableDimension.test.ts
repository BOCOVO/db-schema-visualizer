import { computeTableDimension } from "../computeTableDimension";

import { exampleData } from "@/fake/fakeJsonTables";
import {
  TABLE_HEADER_HEIGHT,
  TABLE_DEFAULT_MIN_WIDTH,
} from "@/constants/sizing";

describe("compute table dimension", () => {
  test("compute table dimension", () => {
    expect(computeTableDimension(exampleData.tables[0])).toEqual({
      width: TABLE_DEFAULT_MIN_WIDTH,
      height: TABLE_HEADER_HEIGHT * 5,
    });
  });
});
