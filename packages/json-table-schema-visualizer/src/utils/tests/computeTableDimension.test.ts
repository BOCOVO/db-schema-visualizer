import { computeTableDimension } from "../computeTableDimension";

import { exampleData } from "@/fake/fakeJsonTables";
import {
  TABLE_HEADER_HEIGHT,
  TABLE_DEFAULT_MIN_WIDTH,
  COLUMN_HEIGHT,
} from "@/constants/sizing";

jest.mock("../computeTextSize", () => ({
  computeTextSize: jest.fn((text: string) => ({
    width: text.length,
    height: 10,
  })),
}));

describe("compute table dimension", () => {
  test("compute table dimension", () => {
    const table = exampleData.tables[0];
    const expectedHeight =
      TABLE_HEADER_HEIGHT + COLUMN_HEIGHT * table.fields.length;
    expect(computeTableDimension(table)).toEqual({
      width: TABLE_DEFAULT_MIN_WIDTH,
      height: expectedHeight,
    });
  });
});
