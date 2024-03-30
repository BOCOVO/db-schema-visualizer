import { useTheme } from "@/hooks/theme";
import { computeConnectionPath } from "@/utils/computeConnectionPath";
import type Konva from "konva";
import { useMemo, useRef } from "react";
import { Path } from "react-konva";
import KonvaText from "./dumb/KonvaText";
import type { Position, XYPosition } from "@/types/positions";
import type { RelationItem } from "@/types/relation";
import { useRelationsCoords } from "@/hooks/relationConnection";
import { computeRelationTextPosition } from "@/utils/computeRelationTextPosition";

interface RelationConnectionProps {
  source: RelationItem;
  target: RelationItem;
}

const RelationConnection = ({ source, target }: RelationConnectionProps) => {
  const theme = useTheme();
  const pathShapeRef = useRef<null | Konva.Path>(null);
  const { sourcePosition, sourceXY, targetPosition, targetXY } =
    useRelationsCoords(source, target);

  const { x: sourceX, y: sourceY } = sourceXY;
  const { x: targetX, y: targetY } = targetXY;

  const linePath = useMemo(() => {
    return computeConnectionPath({
      sourcePosition,
      targetPosition,
      sourceX,
      targetX,
      sourceY,
      targetY,
    });
  }, [sourcePosition, targetPosition, sourceX, targetX, sourceY, targetY]);

  return (
    <>
      <RelationsTextIndicators
        sourceRelation={source.relation}
        targetRelation={target.relation}
        sourcePosition={sourcePosition}
        targetPosition={targetPosition}
        sourceXY={sourceXY}
        targetXY={targetXY}
      />

      <Path
        ref={pathShapeRef}
        data={linePath}
        strokeWidth={2}
        stroke={theme.connection.default}
      />
    </>
  );
};

export default RelationConnection;

interface RelationsTextIndicatorsProps {
  sourceRelation: string;
  targetRelation: string;
  sourcePosition: Position;
  targetPosition: Position;
  sourceXY: XYPosition;
  targetXY: XYPosition;
}

const RelationsTextIndicators = ({
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
