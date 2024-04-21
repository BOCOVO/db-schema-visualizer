/**
 * copied from https://github.com/xyflow/xyflow/blob/8b200b4f25c5e017a86974161b19bf75656d671b/packages/system/src/utils/edges/bezier-edge.ts
 * with some update
 */

import { compteSymbolOffset } from "../getRelationSymbol";

import { Position, type XYPosition } from "@/types/positions";

interface GetBezierPathParams {
  source: XYPosition;
  target: XYPosition;
  sourcePosition?: Position;
  targetPosition?: Position;
  curvature?: number;
}

interface GetControlWithCurvatureParams {
  pos: Position;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  c: number;
}

function calculateControlOffset(distance: number, curvature: number): number {
  if (distance >= 0) {
    return 0.5 * distance;
  }

  return curvature * 25 * Math.sqrt(-distance);
}

function getControlWithCurvature({
  pos,
  x1,
  y1,
  x2,
  y2,
  c,
}: GetControlWithCurvatureParams): [number, number] {
  switch (pos) {
    case Position.Left:
      return [x1 - calculateControlOffset(x1 - x2, c), y1];
    case Position.Right:
      return [x1 + calculateControlOffset(x2 - x1, c), y1];
    case Position.Top:
      return [x1, y1 - calculateControlOffset(y1 - y2, c)];
    case Position.Bottom:
      return [x1, y1 + calculateControlOffset(y2 - y1, c)];
  }
}

export function getBezierPath({
  source,
  sourcePosition = Position.Bottom,
  target,
  targetPosition = Position.Top,
  curvature = 0.5,
}: GetBezierPathParams): string {
  const [sourceControlX, sourceControlY] = getControlWithCurvature({
    pos: sourcePosition,
    x1: source.x,
    y1: source.y,
    x2: target.x,
    y2: target.y,
    c: curvature,
  });

  const [targetControlX, targetControlY] = getControlWithCurvature({
    pos: targetPosition,
    x1: target.x,
    y1: target.y,
    x2: source.x,
    y2: source.y,
    c: curvature,
  });

  const sourceOffset = compteSymbolOffset(sourcePosition, source);
  const targetOffset = compteSymbolOffset(targetPosition, target);

  const path = `M${source.x},${source.y} L${sourceOffset.x},${sourceOffset.y} C${sourceControlX},${sourceControlY} ${targetControlX},${targetControlY} ${targetOffset.x},${targetOffset.y} L${target.x},${target.y}`;

  return path;
}
