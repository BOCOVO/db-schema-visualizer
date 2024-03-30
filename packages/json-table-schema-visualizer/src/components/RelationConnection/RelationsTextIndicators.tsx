import KonvaText from "../dumb/KonvaText";

import { computeRelationTextPosition } from "@/utils/computeRelationTextPosition";
import { type Position, type XYPosition } from "@/types/positions";

interface RelationsTextIndicatorsProps {
  sourceRelation: string;
  targetRelation: string;
  sourcePosition: Position;
  targetPosition: Position;
  sourceXY: XYPosition;
  targetXY: XYPosition;
}

export const RelationsTextIndicators = ({
  sourceRelation,
  targetRelation,
  sourcePosition,
  targetPosition,
  sourceXY,
  targetXY,
}: RelationsTextIndicatorsProps) => {
  const sourceTextXY = computeRelationTextPosition(sourcePosition, sourceXY);
  const targetTextXY = computeRelationTextPosition(targetPosition, targetXY);
  return (
    <>
      <KonvaText {...sourceTextXY} text={sourceRelation} />

      <KonvaText {...targetTextXY} text={targetRelation} />
    </>
  );
};
