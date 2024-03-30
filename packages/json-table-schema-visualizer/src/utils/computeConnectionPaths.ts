import {
  computePathFromPoints,
  getConnectionLinePoints,
} from "./computeConnectionPath";
import { getRelationSymbol } from "./getRelationSymbol";

import { type Position, type XYPosition } from "@/types/positions";

interface Props {
  sourceXY: XYPosition;
  sourcePosition: Position;
  targetXY: XYPosition;
  targetPosition: Position;
  relationSource: string;
  relationTarget: string;
}

export const computeConnectionPathWithSymbols = ({
  relationSource,
  relationTarget,
  sourceXY,
  targetXY,
  sourcePosition,
  targetPosition,
}: Props): string => {
  const points = getConnectionLinePoints({
    sourcePosition,
    targetPosition,
    source: sourceXY,
    target: targetXY,
  });

  const linePath = computePathFromPoints(points);

  const sourcePoint = points.at(0);
  const targetPoint = points.at(-1);

  const sourceSymbolPath =
    sourcePoint != null &&
    getRelationSymbol(relationSource, sourcePosition, sourcePoint);
  const targetSymbolPath =
    targetPoint != null &&
    getRelationSymbol(relationTarget, targetPosition, targetPoint);

  return `${linePath} ${sourceSymbolPath} ${targetSymbolPath}`;
};
