import { useEffect, useState } from "react";

import { useTablesInfo } from "./table";
import { useTableWidthStoredValue } from "./tableWidthStore";
import { useTableDetailLevel } from "./tableDetailLevel";

import type { RelationItem } from "@/types/relation";
import type { Position, XYPosition } from "@/types/positions";

import { computeColY } from "@/utils/computeColY";
import { computeTableDragEventName } from "@/utils/eventName";
import eventEmitter from "@/events-emitter";
import { computeConnectionHandlePos } from "@/utils/computeConnectionHandlePositions";
import { tableCoordsStore } from "@/stores/tableCoords";
import { TableDetailLevel } from "@/types/tabelDetailLevel";
import { TABLE_HEADER_HEIGHT } from "@/constants/sizing";

interface UseRelationTablesCoordsReturn {
  sourceXY: XYPosition;
  targetXY: XYPosition;
  targetPosition: Position;
  sourcePosition: Position;
}

/**
 * computes the y coordinates of the relation endpoints according to their
 * index in their table.
 */
export const useRelationsColsY = (
  source: RelationItem,
  target: RelationItem,
): [number, number] => {
  const tablesInfo = useTablesInfo();

  const sourceColY = computeColY(tablesInfo.colsIndexes, source);
  const targetColY = computeColY(tablesInfo.colsIndexes, target);

  return [sourceColY, targetColY];
};

export const useRelationsCoords = (
  source: RelationItem,
  target: RelationItem,
): UseRelationTablesCoordsReturn => {
  // by default use table position available in the
  // table coords store

  const [sourceTableCoords, setSourceTableCoords] = useState<XYPosition>(() =>
    tableCoordsStore.getCoords(source.tableName),
  );
  const [targetTableCoords, setTargetTableCoords] = useState<XYPosition>(() =>
    tableCoordsStore.getCoords(target.tableName),
  );
  const [sourceColY, targetColY] = useRelationsColsY(source, target);

  const sourceTableWidth = useTableWidthStoredValue(source.tableName);
  const targetTableWidth = useTableWidthStoredValue(target.tableName);

  const sourceTableDragEventName = computeTableDragEventName(source?.tableName);
  const targetTableDragEventName = computeTableDragEventName(target?.tableName);
  const { detailLevel } = useTableDetailLevel();
  // update source table coordinates on the source table drag event
  useEffect(() => {
    const coordsUpdater = (coords: XYPosition): void => {
      setSourceTableCoords(coords);
    };

    eventEmitter.on(sourceTableDragEventName, coordsUpdater);

    return () => {
      eventEmitter.removeListener(sourceTableDragEventName, coordsUpdater);
    };
  }, [sourceTableDragEventName]);

  // update target table coordinates on the target table drag event
  useEffect(() => {
    const coordsUpdater = (coords: XYPosition): void => {
      setTargetTableCoords(coords);
    };

    eventEmitter.on(targetTableDragEventName, coordsUpdater);

    return () => {
      eventEmitter.removeListener(targetTableDragEventName, coordsUpdater);
    };
  }, [targetTableDragEventName]);

  const [sourcePosition, targetPosition, finalSourceX, finalTargetX] =
    computeConnectionHandlePos({
      sourceW: sourceTableWidth,
      sourceX: sourceTableCoords.x,
      targetW: targetTableWidth,
      targetX: targetTableCoords.x,
    });

  // addition of the coordX to the cordXq to obtain the including
  // the real position of the table in the scene
  if (detailLevel === TableDetailLevel.HeaderOnly) {
    return {
      sourcePosition,
      targetPosition,
      sourceXY: {
        x: finalSourceX,
        y: sourceTableCoords.y + TABLE_HEADER_HEIGHT / 2,
      },
      targetXY: {
        x: finalTargetX,
        y: targetTableCoords.y + TABLE_HEADER_HEIGHT / 2,
      },
    };
  }
  const finalSourceY = sourceColY + sourceTableCoords.y;
  const finalTargetY = targetColY + targetTableCoords.y;

  return {
    sourcePosition,
    targetPosition,
    sourceXY: { x: finalSourceX, y: finalSourceY },
    targetXY: { x: finalTargetX, y: finalTargetY },
  };
};
