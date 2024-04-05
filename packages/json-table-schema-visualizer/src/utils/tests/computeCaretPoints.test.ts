import { computeCaretPoints } from "../computeCaretPoints";

describe("compute field detail popover caret points", () => {
  test("compute field detail popover caret points", () => {
    expect(computeCaretPoints(0, 10)).toEqual([0, 5, 5, 0, 5, 10]);
  });
});
