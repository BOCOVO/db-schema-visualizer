import { CONNECTION_HANDLE_OFFSET, FONT_SIZES } from "@/constants/sizing";
import { Position, type XYPosition } from "@/types/positions";

export const computeRelationTextPosition = (
  position: Position,
  coords: XYPosition,
): XYPosition => {
  const y = coords.y - FONT_SIZES.lg;

  const connectionHandleHalfSize = CONNECTION_HANDLE_OFFSET / 2;
  const x =
    position === Position.Left
      ? coords.x - connectionHandleHalfSize
      : coords.x + connectionHandleHalfSize;

  return { x, y };
};
