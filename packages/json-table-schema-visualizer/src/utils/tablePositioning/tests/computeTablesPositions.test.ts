import computeTablesPositions from "../computeTablesPositions";
import { getColsNumber } from "../getColsNumber";

import { TABLES_GAP_Y } from "@/constants/sizing";
import { createBookingsTableClone, exampleData } from "@/fake/fakeJsonTables";

jest.mock("../getColsNumber", () => ({
  getColsNumber: jest.fn(),
}));

jest.mock("../../computeTableDimension", () => ({
  computeTableDimension: () => ({
    width: 200,
    height: 150,
  }),
}));

describe("compute tables positions (dagre)", () => {
  test("keeps coordinates non-negative and unique per table", () => {
    const map = computeTablesPositions(exampleData.tables, []);

    expect(map.size).toBe(exampleData.tables.length);

    const coords = Array.from(map.values());
    coords.forEach(({ x, y }) => {
      expect(x).toBeGreaterThanOrEqual(0);
      expect(y).toBeGreaterThanOrEqual(0);
    });

    const uniqueKeys = new Set(coords.map(({ x, y }) => `${x}-${y}`));
    expect(uniqueKeys.size).toBe(coords.length);
  });

  test("orders tables consistently when column count changes", () => {
    (getColsNumber as jest.Mock).mockReturnValueOnce(3);
    const gridThree = computeTablesPositions(
      [...exampleData.tables, createBookingsTableClone("1")],
      [],
    );

    (getColsNumber as jest.Mock).mockReturnValueOnce(4);
    const gridFour = computeTablesPositions(
      [...exampleData.tables, createBookingsTableClone("1")],
      [],
    );

    const usersThree = gridThree.get("users");
    const bookingsThree = gridThree.get("bookings_1");
    expect(usersThree?.x ?? 0).toBeLessThanOrEqual(bookingsThree?.x ?? 0);

    const usersFour = gridFour.get("users");
    const bookingsFour = gridFour.get("bookings_1");
    expect(usersFour?.x ?? 0).toBeLessThanOrEqual(bookingsFour?.x ?? 0);
  });

  test("vertical spacing respects TABLES_GAP_Y between rows", () => {
    (getColsNumber as jest.Mock).mockReturnValue(3);

    const positions = computeTablesPositions(exampleData.tables, []);
    const sorted = Array.from(positions.values())
      .sort((a, b) => a.y - b.y)
      .map(({ y }) => y);

    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i] - sorted[i - 1]).toBeGreaterThanOrEqual(TABLES_GAP_Y);
    }
  });
});
