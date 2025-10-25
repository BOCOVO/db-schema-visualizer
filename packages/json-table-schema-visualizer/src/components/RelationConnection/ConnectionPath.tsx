import { Path, Group, Circle, RegularPolygon } from "react-konva";
import { useState, useRef, useMemo } from "react";

import type { XYPosition } from "@/types/positions";

import eventEmitter from "@/events-emitter";
import { tableCoordsStore } from "@/stores/tableCoords";
import {
  DIAGRAM_PADDING,
  COLUMN_HEIGHT,
  TABLE_HEADER_HEIGHT,
} from "@/constants/sizing";
import { useThemeColors } from "@/hooks/theme";
import { useTablesInfo } from "@/hooks/table";
import { useTableColor } from "@/hooks/tableColor";
import { useTableWidthStoredValue } from "@/hooks/tableWidthStore";
import {
  findNearestPointOnPath,
  getButtonLocalAndStage,
  decideTargetAndAngleFromPath,
  computeTooCloseStage,
  setArrowZIndexRelativeToTables,
} from "@/utils/connectionPathUtils";

interface ConnectionPathProps {
  path: string;
  sourceTableName: string;
  targetTableName: string;
  relationOwner: string;
}

const ARROW_ANGLE_OFFSET = 90;
const MIN_LINE_OFFSET = 40; // Distance from each endpoint - hides circle if within this distance
const END_LINE_TOLERATE = 5; // At the end of the target line, it needs hardcoded additional distance
const ARROW_BUTTON_DISAPPEARANCE_DELAY = 50;

const ConnectionPath = ({
  path,
  sourceTableName,
  targetTableName,
  relationOwner,
}: ConnectionPathProps) => {
  const themeColors = useThemeColors();
  const tablesInfo = useTablesInfo();
  const { hoveredTableName, setHoveredTableName } = tablesInfo;
  const sourceTableColors = useTableColor(relationOwner);
  const srcWidth = useTableWidthStoredValue(sourceTableName);
  const tgtWidth = useTableWidthStoredValue(targetTableName);
  const [isHovered, setIsHovered] = useState(false);
  const [btnVisible, setBtnVisible] = useState(false);
  const [btnPos, setBtnPos] = useState<XYPosition>({ x: 0, y: 0 });
  const [btnAngle, setBtnAngle] = useState(0);
  const [btnTarget, setBtnTarget] = useState<string | null>(null);
  const [btnHovering, setBtnHovering] = useState(false);
  const hideTimeoutRef = useRef<number | null>(null);
  const btnStagePosRef = useRef<{ x: number; y: number } | null>(null);

  // Keep a ref to the arrow group so we can bring it to top of the layer when visible
  const arrowGroupRef = useRef<any>(null);

  const colsIndexes = tablesInfo.colsIndexes ?? {};

  const countFieldsForTable = (tableName: string): number =>
    Object.keys(colsIndexes).filter((k) => k.startsWith(`${tableName}.`))
      .length;

  const [sourceFieldsCount, targetFieldsCount] = useMemo(
    () => [
      countFieldsForTable(sourceTableName),
      countFieldsForTable(targetTableName),
    ],
    [colsIndexes, sourceTableName, targetTableName],
  );

  const srcHeight = TABLE_HEADER_HEIGHT + COLUMN_HEIGHT * sourceFieldsCount;
  const tgtHeight = TABLE_HEADER_HEIGHT + COLUMN_HEIGHT * targetFieldsCount;

  interface TableBounds {
    left: number;
    right: number;
    top: number;
    bottom: number;
  }

  const buildTableBounds = (
    coords: XYPosition,
    width: number,
    height: number,
  ): TableBounds => ({
    left: coords.x ?? 0,
    right: (coords.x ?? 0) + width,
    top: coords.y ?? 0,
    bottom: (coords.y ?? 0) + height,
  });

  const distanceToBounds = (point: XYPosition, bounds: TableBounds): number => {
    const clampedX = Math.max(bounds.left, Math.min(point.x, bounds.right));
    const clampedY = Math.max(bounds.top, Math.min(point.y, bounds.bottom));
    return Math.hypot(point.x - clampedX, point.y - clampedY);
  };

  const resolveTargetByEdgeDistance = (
    point: XYPosition,
    srcCoords: XYPosition,
    tgtCoords: XYPosition,
  ): string => {
    const sourceBounds = buildTableBounds(srcCoords, srcWidth, srcHeight);
    const targetBounds = buildTableBounds(tgtCoords, tgtWidth, tgtHeight);
    const sourceDistance = distanceToBounds(point, sourceBounds);
    const targetDistance = distanceToBounds(point, targetBounds);
    return sourceDistance < targetDistance ? targetTableName : sourceTableName;
  };

  const normalizeAngle = (angle: number): number => {
    const normalized = angle % 360;
    return normalized < 0 ? normalized + 360 : normalized;
  };

  const highlight =
    hoveredTableName === sourceTableName ||
    hoveredTableName === targetTableName ||
    isHovered;

  const strokeColor = highlight
    ? sourceTableColors?.regular ?? themeColors.connection.active
    : themeColors.connection.default;

  const handleOnHover = () => {
    setIsHovered(true);
    setBtnVisible(true);
  };

  const handleOnBlur = () => {
    setIsHovered(false);
    if (hideTimeoutRef.current != null) {
      window.clearTimeout(hideTimeoutRef.current);
    }
    hideTimeoutRef.current = window.setTimeout(() => {
      if (!btnHovering) setBtnVisible(false);
      hideTimeoutRef.current = null;
    }, ARROW_BUTTON_DISAPPEARANCE_DELAY);
  };

  const handleOnMove = (e: any) => {
    const stage = e.target.getStage();
    if (stage == null) return;
    const pointer = stage.getPointerPosition();
    if (pointer == null) return;

    const px = pointer.x as number;
    const py = pointer.y as number;

    const node = e.target;
    const srcCoords = tableCoordsStore.getCoords(sourceTableName);
    const tgtCoords = tableCoordsStore.getCoords(targetTableName);
    let localX = px;
    let localY = py;

    // Local computed results
    let computedArrow: string | null = null;
    let computedAngle: number | null = null;

    try {
      const { best, bestL, totalLength } = findNearestPointOnPath(node, px, py);
      if (best != null && totalLength > 0) {
        const {
          localX: lX,
          localY: lY,
          btnStagePos,
        } = getButtonLocalAndStage(node, best, DIAGRAM_PADDING);
        localX = lX;
        localY = lY;
        if (btnStagePos != null) btnStagePosRef.current = btnStagePos;

        // Decide arrow target and angle based on path geometry + stage centers
        try {
          const decision = decideTargetAndAngleFromPath(
            node,
            bestL,
            totalLength,
            btnStagePosRef.current,
            sourceTableName,
            targetTableName,
            colsIndexes,
            srcWidth,
            tgtWidth,
            srcCoords,
            tgtCoords,
          );
          if (decision.computedArrow != null)
            computedArrow = decision.computedArrow;
          if (decision.computedAngle != null)
            computedAngle = decision.computedAngle; // degrees without ARROW_ANGLE_OFFSET
        } catch (ex) {
          // Ignore and fallback below
        }
      }
    } catch (err) {
      // Fallback to stage coords + padding
      localX = px + DIAGRAM_PADDING;
      localY = py + DIAGRAM_PADDING;
      btnStagePosRef.current = { x: px, y: py };
    }
    if (btnStagePosRef.current == null) {
      btnStagePosRef.current = { x: px, y: py };
    }
    const buttonPoint: XYPosition = { x: localX, y: localY };
    setBtnPos(buttonPoint);
    const edgeTarget = resolveTargetByEdgeDistance(
      buttonPoint,
      srcCoords,
      tgtCoords,
    );
    setBtnTarget(edgeTarget);

    // Decide visibility: hide when too close to path endpoints (prevents overlap with tables and relation markers).
    // Use a robust stage-space distance check between the current button
    // position and the path start/end. This is simpler and more reliable than
    // depending on arc-length methods which can be flaky on transformed paths.
    const tooClose = computeTooCloseStage(
      node,
      btnStagePosRef.current ?? { x: px, y: py },
      MIN_LINE_OFFSET,
      END_LINE_TOLERATE,
    );

    // Ensure arrow is above relation lines but below table nodes. We look for
    // the first child whose name starts with `table-` and set the arrow's
    // z-index to just before that index. If no table child is found, move the
    // arrow to the top of the parent's children so it's above lines.
    if (!tooClose && arrowGroupRef.current != null) {
      setArrowZIndexRelativeToTables(arrowGroupRef.current);
    }
    if (computedAngle != null) {
      let finalAngle = computedAngle;
      if (
        computedArrow != null &&
        edgeTarget != null &&
        edgeTarget !== computedArrow
      ) {
        finalAngle += 180;
      }
      setBtnAngle(normalizeAngle(finalAngle) + ARROW_ANGLE_OFFSET);
    }

    setBtnVisible(!tooClose);
  };

  const handleBtnLeave = () => {
    document.body.style.cursor = "default";
    setBtnHovering(false);
    setIsHovered(false);
    if (hideTimeoutRef.current != null) {
      window.clearTimeout(hideTimeoutRef.current);
    }
    hideTimeoutRef.current = window.setTimeout(() => {
      setBtnVisible(false);
      hideTimeoutRef.current = null;
    }, 80);
  };

  const handleBtnEnter = () => {
    document.body.style.cursor = "pointer";
    setBtnHovering(true);
    setIsHovered(true); // hover both line and circle
    if (hideTimeoutRef.current != null) {
      window.clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  };

  const handleBtnClick = () => {
    // Recompute the intended target using the stored stage-position of the button
    const srcCoords = tableCoordsStore.getCoords(sourceTableName);
    const tgtCoords = tableCoordsStore.getCoords(targetTableName);
    // Use the button position in the same coordinate-space as table coords (btnPos)
    const btnLocal = btnPos;
    let targetToUse: string | null = btnTarget;
    if (btnLocal != null) {
      targetToUse = resolveTargetByEdgeDistance(btnLocal, srcCoords, tgtCoords);
    }

    if (targetToUse == null || targetToUse.length === 0) return;
    try {
      setHoveredTableName(targetToUse);
    } catch (e) {
      // Ignore
    }
    eventEmitter.emit("table:center", { tableName: targetToUse });
    eventEmitter.emit(`highlight:table:${targetToUse}`);
  };

  return (
    <>
      <Path
        data={path}
        onMouseEnter={handleOnHover}
        onMouseLeave={handleOnBlur}
        onMouseMove={handleOnMove}
        hitStrokeWidth={12}
        strokeWidth={2}
        stroke={strokeColor}
      />

      {btnVisible && (
        <Group x={btnPos.x} y={btnPos.y} listening={true} ref={arrowGroupRef}>
          <Circle
            x={0}
            y={0}
            radius={14}
            fill={strokeColor}
            cursor="pointer"
            onMouseEnter={handleBtnEnter}
            onMouseLeave={handleBtnLeave}
            onClick={handleBtnClick}
            listening={true}
          />
          {/* Triangle arrow as vector, rotated to face target */}
          <RegularPolygon
            x={0}
            y={0}
            sides={3}
            radius={6}
            fill="#fff"
            rotation={btnAngle}
            listening={false}
          />
        </Group>
      )}
    </>
  );
};

export default ConnectionPath;
