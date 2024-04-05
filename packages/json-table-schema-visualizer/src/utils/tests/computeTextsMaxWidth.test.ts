import { computeTextSize } from "../computeTextSize";
import { computeTextsMaxWidth } from "../computeTextsMaxWidth";

describe("get the more longer text width", () => {
  test("get the more longer text width", () => {
    expect(computeTextsMaxWidth(["simple", "more longer"])).toBe(
      computeTextSize("more longer"),
    );
  });
});
