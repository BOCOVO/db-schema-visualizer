import { useMemo } from "react";

import ConnectionPath from "./ConnectionPath";

import type { RelationItem } from "@/types/relation";

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
      <ConnectionPath
        path={linePath}
        sourceTableName={source.tableName}
        targetTableName={target.tableName}
      />
    </>
  );
};

export default RelationConnection;
