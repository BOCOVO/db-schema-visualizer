import { useMemo } from "react";

import ConnectionPath from "./ConnectionPath";

import type { RelationItem } from "@/types/relation";

import { useRelationsCoords } from "@/hooks/relationConnection";
import { computeConnectionPathWithSymbols } from "@/utils/computeConnectionPaths";

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
    return computeConnectionPathWithSymbols({
      targetXY,
      sourceXY,
      sourcePosition,
      targetPosition,
      relationSource: source.relation,
      relationTarget: target.relation,
    });
  }, [sourcePosition, targetPosition, sourceX, targetX, sourceY, targetY]);

  const relationOwner =
    source.relation === "1" ? source.tableName : target.tableName;

  return (
    <>
      <ConnectionPath
        path={linePath}
        sourceTableName={source.tableName}
        targetTableName={target.tableName}
        relationOwner={relationOwner}
        sourceFieldNames={source.fieldNames ?? []}
        targetFieldNames={target.fieldNames ?? []}
      />
    </>
  );
};

export default RelationConnection;
