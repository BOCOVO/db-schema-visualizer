import { useMemo } from "react";

import { RelationsTextIndicators } from "./RelationsTextIndicators";
import ConnectionPath from "./ConnectionPath";

import type { RelationItem } from "@/types/relation";

import { computeConnectionPath } from "@/utils/computeConnectionPath";
import { useRelationsCoords } from "@/hooks/relationConnection";

interface RelationConnectionProps {
  source: RelationItem;
  target: RelationItem;
}

const RelationConnection = ({ source, target }: RelationConnectionProps) => {
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

      <ConnectionPath
        path={linePath}
        sourceTableName={source.tableName}
        targetTableName={target.tableName}
      />
    </>
  );
};

export default RelationConnection;
