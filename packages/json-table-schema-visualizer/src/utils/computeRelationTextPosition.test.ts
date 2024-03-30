import { describe, test, expect } from "@jest/globals";

import { computeRelationTextPosition } from "./computeRelationTextPosition";

import { Position } from "@/types/positions";
import { CONNECTION_HANDLE_OFFSET, FONT_SIZES } from "@/constants/sizing";

describe("compute relation text coords", () => {
  test("compute relation text coords with position left", () => {
    expect(computeRelationTextPosition(Position.Left, { x: 0, y: 0 })).toEqual({
      x: -CONNECTION_HANDLE_OFFSET / 2,
      y: -FONT_SIZES.lg,
    });
  });

  test("compute relation text coords with position right", () => {
    expect(computeRelationTextPosition(Position.Right, { x: 0, y: 0 })).toEqual(
      {
        x: CONNECTION_HANDLE_OFFSET / 2,
        y: -FONT_SIZES.lg,
      },
    );
  });
});
