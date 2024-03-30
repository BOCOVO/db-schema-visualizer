import { Position } from "@/types/positions";

interface Params {
  sourceW: number;
  sourceX: number;
  targetX: number;
  targetW: number;
}

const intersectionGap = 40;

export const computeConnectionHandlePos = ({
  sourceX,
  sourceW,
  targetW,
  targetX,
}: Params): [Position, Position, number, number] => {
  const sourceEndX = sourceX + sourceW;
  const targetEndX = targetX + targetW;

  const horizontalIntersection =
    Math.max(sourceEndX, targetEndX) - Math.min(sourceX, targetX);

  if (horizontalIntersection <= targetW + sourceW + intersectionGap) {
    return [Position.Left, Position.Left, sourceX, targetX];
  }

  if (sourceEndX < targetEndX) {
    return [Position.Right, Position.Left, sourceEndX, targetX];
  }

  return [Position.Left, Position.Right, sourceX, targetEndX];
};
