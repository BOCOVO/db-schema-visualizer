import { Position, type XYPosition } from "@/types/positions";
const computeOneTypeRelationSymbol = (
  { x, y }: XYPosition,
  position: Position,
): string => {
  const halfHeight = 3;
  const offsetX = 6;

  const symbolX = position === Position.Left ? x - offsetX : x + offsetX;
  const path = `M${symbolX},${y - halfHeight} L${symbolX},${y + halfHeight}`;

  return path;
};

const computeMultipleTypeRelationSymbol = (
  { x, y }: XYPosition,
  position: Position,
): string => {
  const halfHeight = 5;
  const symbolWidth = 8;

  return `M${x},${y - halfHeight} L${position === Position.Left ? x - symbolWidth : x + symbolWidth},${y} L${x},${y + halfHeight}`;
};

export const getRelationSymbol = (
  relation: string,
  position: Position,
  coord: XYPosition,
): string => {
  if (relation === "1") {
    return computeOneTypeRelationSymbol(coord, position);
  }

  return computeMultipleTypeRelationSymbol(coord, position);
};
