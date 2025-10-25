import { computeTextSize } from "../computeTextSize";
import { computeTextsMaxWidth } from "../computeTextsMaxWidth";

jest.mock("../computeTextSize", () => ({
  computeTextSize: jest.fn((text: string) => ({
    width: text.length,
    height: 10,
  })),
}));

describe("get the more longer text width", () => {
  test("get the more longer text width", () => {
    expect(computeTextsMaxWidth(["simple", "more longer"])).toBe(
      computeTextSize("more longer").width,
    );
  });
});
