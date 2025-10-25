/**
 * Utility helpers for ConnectionPath component.
 */
import { TABLE_HEADER_HEIGHT, COLUMN_HEIGHT } from "@/constants/sizing";
const RAD_TO_DEG = 180 / Math.PI;

export function getPointerLocal(
  node: any,
  px: number,
  py: number,
): { x: number; y: number } {
  const inv = node.getAbsoluteTransform().copy().invert();
  return inv.point({ x: px, y: py } as any);
}

export function findNearestPointOnPath(
  node: any,
  px: number,
  py: number,
): {
  best: { x: number; y: number } | null;
  bestL: number;
  totalLength: number;
} {
  try {
    const pointerLocal = getPointerLocal(node, px, py);
    const length = typeof node.getLength === "function" ? node.getLength() : 0;
    const totalLength = Number(length);
    if (!(length > 0)) return { best: null, bestL: 0, totalLength };

    const step = Math.max(1, Math.floor(totalLength / 40));
    let best: { x: number; y: number } | null = null;
    let bestL = 0;
    let minDist = Infinity;

    for (let l = 0; l <= totalLength; l += step) {
      const pt = node.getPointAtLength(l);
      const dx = pt.x - pointerLocal.x;
      const dy = pt.y - pointerLocal.y;
      const d = dx * dx + dy * dy;
      if (d < minDist) {
        minDist = d;
        best = pt;
        bestL = l;
      }
    }

    if (best != null) {
      const refineRadius = Math.min(totalLength, Math.max(step, 40));
      const startL = Math.max(0, bestL - refineRadius);
      const endL = Math.min(totalLength, bestL + refineRadius);
      let left = startL;
      let right = endL;
      const ITERATIONS = 20;
      let refinedMinDist = minDist;
      let refinedBestL = bestL;
      for (let it = 0; it < ITERATIONS && right - left > 0.0001; it++) {
        const m1 = left + (right - left) / 3;
        const m2 = right - (right - left) / 3;
        const p1 = node.getPointAtLength(m1);
        const p2 = node.getPointAtLength(m2);
        const dx1 = p1.x - pointerLocal.x;
        const dy1 = p1.y - pointerLocal.y;
        const d1 = dx1 * dx1 + dy1 * dy1;
        const dx2 = p2.x - pointerLocal.x;
        const dy2 = p2.y - pointerLocal.y;
        const d2 = dx2 * dx2 + dy2 * dy2;
        if (d1 < d2) {
          right = m2;
          if (d1 < refinedMinDist) {
            refinedMinDist = d1;
            refinedBestL = m1;
            best = p1;
          }
        } else {
          left = m1;
          if (d2 < refinedMinDist) {
            refinedMinDist = d2;
            refinedBestL = m2;
            best = p2;
          }
        }
      }
      const finalL = (left + right) / 2;
      const finalPt = node.getPointAtLength(finalL);
      const dxF = finalPt.x - pointerLocal.x;
      const dyF = finalPt.y - pointerLocal.y;
      const dF = dxF * dxF + dyF * dyF;
      if (dF < refinedMinDist) {
        refinedMinDist = dF;
        refinedBestL = finalL;
        best = finalPt;
      }
      // Endpoint checks
      try {
        const startPt = node.getPointAtLength(0);
        const endPt = node.getPointAtLength(totalLength);
        const dxStart = startPt.x - pointerLocal.x;
        const dyStart = startPt.y - pointerLocal.y;
        const dxEnd = endPt.x - pointerLocal.x;
        const dyEnd = endPt.y - pointerLocal.y;
        const distStartSq = dxStart * dxStart + dyStart * dyStart;
        const distEndSq = dxEnd * dxEnd + dyEnd * dyEnd;
        if (distEndSq < refinedMinDist) {
          refinedBestL = totalLength;
          best = endPt;
        } else if (distStartSq < refinedMinDist) {
          refinedBestL = 0;
          best = startPt;
        }
      } catch (ex) {
        // ignore
      }
      bestL = refinedBestL;
    }
    return { best, bestL, totalLength };
  } catch (ex) {
    return { best: null, bestL: 0, totalLength: 0 };
  }
}

export function computeEndpointStageInfo(
  node: any,
  btnStage: { x: number; y: number } | null,
): {
  startStage: { x: number; y: number };
  endStage: { x: number; y: number };
  distStart: number;
  distEnd: number;
  totalLength: number;
} | null {
  try {
    const abs = node.getAbsoluteTransform();
    const length = typeof node.getLength === "function" ? node.getLength() : 0;
    const totalLength = Number(length);
    const startPt = node.getPointAtLength(0);
    const endPt = node.getPointAtLength(totalLength);
    const startStage = abs.point({ x: startPt.x, y: startPt.y } as any);
    const endStage = abs.point({ x: endPt.x, y: endPt.y } as any);
    const btn = btnStage ?? null;
    const distStart =
      btn != null
        ? Math.hypot(startStage.x - btn.x, startStage.y - btn.y)
        : Infinity;
    const distEnd =
      btn != null
        ? Math.hypot(endStage.x - btn.x, endStage.y - btn.y)
        : Infinity;
    return { startStage, endStage, distStart, distEnd, totalLength };
  } catch (ex) {
    return null;
  }
}

export function computeTangentAngleAt(
  node: any,
  bestL: number,
  totalLength: number,
  btnStagePos: { x: number; y: number },
  targetCenterStage: { x: number; y: number },
): number | null {
  try {
    const delta = Math.max(1, Math.min(8, totalLength * 0.01));
    const l1 = Math.max(0, bestL - delta);
    const l2 = Math.min(totalLength, bestL + delta);
    const p1 = node.getPointAtLength(l1);
    const p2 = node.getPointAtLength(l2);
    const p1Stage = node
      .getAbsoluteTransform()
      .point({ x: p1.x, y: p1.y } as any);
    const p2Stage = node
      .getAbsoluteTransform()
      .point({ x: p2.x, y: p2.y } as any);
    const tan = { x: p2Stage.x - p1Stage.x, y: p2Stage.y - p1Stage.y };
    let tanLen = Math.hypot(tan.x, tan.y);
    if (!Number.isFinite(tanLen) || tanLen === 0) tanLen = 1;
    let tanAngle = (Math.atan2(tan.y, tan.x) * RAD_TO_DEG) % 360;

    const vecToTarget = {
      x: targetCenterStage.x - btnStagePos.x,
      y: targetCenterStage.y - btnStagePos.y,
    };
    let vecLen = Math.hypot(vecToTarget.x, vecToTarget.y);
    if (!Number.isFinite(vecLen) || vecLen === 0) vecLen = 1;
    const dot =
      (tan.x * vecToTarget.x + tan.y * vecToTarget.y) / (tanLen * vecLen);
    if (dot < 0) tanAngle = (tanAngle + 180) % 360;
    return tanAngle; // degrees, do not add ARROW_ANGLE_OFFSET here
  } catch (ex) {
    return null;
  }
}

export function getButtonLocalAndStage(
  node: any,
  best: { x: number; y: number } | null,
  DIAGRAM_PADDING: number,
): {
  localX: number;
  localY: number;
  btnStagePos: { x: number; y: number } | null;
} {
  if (best == null) return { localX: 0, localY: 0, btnStagePos: null };
  try {
    const stagePoint = node
      .getAbsoluteTransform()
      .point({ x: best.x, y: best.y } as any);
    let localX = stagePoint.x + DIAGRAM_PADDING;
    let localY = stagePoint.y + DIAGRAM_PADDING;
    const parent = node.getParent?.();
    if (parent != null && typeof parent.getAbsoluteTransform === "function") {
      const parentInv = parent.getAbsoluteTransform().copy().invert();
      const parentLocal = parentInv.point(stagePoint);
      localX = parentLocal.x;
      localY = parentLocal.y;
    }
    return {
      localX,
      localY,
      btnStagePos: { x: stagePoint.x, y: stagePoint.y },
    };
  } catch (ex) {
    return { localX: 0, localY: 0, btnStagePos: null };
  }
}

export function decideTargetAndAngleFromPath(
  node: any,
  bestL: number,
  totalLength: number,
  btnStagePos: { x: number; y: number } | null,
  sourceTableName: string,
  targetTableName: string,
  colsIndexes: any,
  srcWidth: number,
  tgtWidth: number,
  srcCoords: { x?: number; y?: number },
  tgtCoords: { x?: number; y?: number },
): { computedArrow: string | null; computedAngle: number | null } {
  let computedArrow: string | null = null;
  let computedAngle: number | null = null;
  try {
    const length = typeof node.getLength === "function" ? node.getLength() : 0;
    const startPt = node.getPointAtLength(0);
    const endPt = node.getPointAtLength(length);
    const abs = node.getAbsoluteTransform();
    const startStage = abs.point({ x: startPt.x, y: startPt.y } as any);
    const endStage = abs.point({ x: endPt.x, y: endPt.y } as any);

    const distStartToSrc = Math.hypot(
      startStage.x - (srcCoords.x ?? 0),
      startStage.y - (srcCoords.y ?? 0),
    );
    const distEndToSrc = Math.hypot(
      endStage.x - (srcCoords.x ?? 0),
      endStage.y - (srcCoords.y ?? 0),
    );
    const startIsSource = distStartToSrc < distEndToSrc;

    const closerToStart = bestL < length / 2;
    if (closerToStart) {
      computedArrow = startIsSource ? targetTableName : sourceTableName;
    } else {
      computedArrow = startIsSource ? sourceTableName : targetTableName;
    }

    const idx = (colsIndexes ?? {}) as Record<string, unknown>;
    const srcFields = Object.keys(idx).filter((k: string) =>
      k.startsWith(`${sourceTableName}.`),
    ).length;
    const tgtFields = Object.keys(idx).filter((k: string) =>
      k.startsWith(`${targetTableName}.`),
    ).length;
    const srcHeight = TABLE_HEADER_HEIGHT + COLUMN_HEIGHT * srcFields;
    const tgtHeight = TABLE_HEADER_HEIGHT + COLUMN_HEIGHT * tgtFields;

    const srcCenter = {
      x: (srcCoords.x ?? 0) + srcWidth / 2,
      y: (srcCoords.y ?? 0) + srcHeight / 2,
    };
    const tgtCenter = {
      x: (tgtCoords.x ?? 0) + tgtWidth / 2,
      y: (tgtCoords.y ?? 0) + tgtHeight / 2,
    };

    const nodeParent = node.getParent();
    if (
      nodeParent != null &&
      typeof nodeParent.getAbsoluteTransform === "function" &&
      btnStagePos != null
    ) {
      const absParent = nodeParent.getAbsoluteTransform();
      const srcCenterStage = absParent.point(srcCenter as any);
      const tgtCenterStage = absParent.point(tgtCenter as any);

      const distToSrc = Math.hypot(
        srcCenterStage.x - btnStagePos.x,
        srcCenterStage.y - btnStagePos.y,
      );
      const distToTgt = Math.hypot(
        tgtCenterStage.x - btnStagePos.x,
        tgtCenterStage.y - btnStagePos.y,
      );

      const targetIsSource = distToSrc > distToTgt;
      computedArrow = targetIsSource ? sourceTableName : targetTableName;
      const targetCenterStage = targetIsSource
        ? srcCenterStage
        : tgtCenterStage;

      const tanAngle = computeTangentAngleAt(
        node,
        bestL,
        totalLength,
        btnStagePos,
        targetCenterStage as { x: number; y: number },
      );
      if (tanAngle != null)
        computedAngle = tanAngle; // caller should add ARROW_ANGLE_OFFSET
      else {
        const fallbackAngle =
          Math.atan2(
            targetCenterStage.y - btnStagePos.y,
            targetCenterStage.x - btnStagePos.x,
          ) * RAD_TO_DEG;
        computedAngle = fallbackAngle;
      }
    }
  } catch (ex) {
    // Ignore and return what we have
  }
  return { computedArrow, computedAngle };
}

export function computeTooCloseStage(
  node: any,
  btnStagePos: { x: number; y: number } | null,
  MIN_LINE_OFFSET: number,
  END_LINE_TOLERATE: number,
): boolean {
  try {
    const abs = node.getAbsoluteTransform();
    const length = typeof node.getLength === "function" ? node.getLength() : 0;
    const startPt = node.getPointAtLength(0);
    const endPt = node.getPointAtLength(length);
    const startStage = abs.point({ x: startPt.x, y: startPt.y } as any);
    const endStage = abs.point({ x: endPt.x, y: endPt.y } as any);
    const btnStage = btnStagePos ?? null;
    if (btnStage == null) return false;
    const distStart = Math.hypot(
      startStage.x - btnStage.x,
      startStage.y - btnStage.y,
    );
    const distEnd = Math.hypot(
      endStage.x - btnStage.x,
      endStage.y - btnStage.y,
    );
    return (
      distStart <= MIN_LINE_OFFSET ||
      distEnd <= MIN_LINE_OFFSET + END_LINE_TOLERATE
    );
  } catch (ex) {
    return false;
  }
}

export function setArrowZIndexRelativeToTables(arrowNode: any): void {
  try {
    const parent = arrowNode.getParent?.() ?? null;
    if (parent != null && typeof parent.getChildren === "function") {
      const children = parent.getChildren().toArray();
      let firstTableIndex = -1;
      for (let i = 0; i < children.length; i++) {
        const ch: any = children[i];
        const name = typeof ch.getName === "function" ? ch.getName() : null;
        if (typeof name === "string" && name.startsWith("table-")) {
          firstTableIndex = i;
          break;
        }
      }
      if (firstTableIndex >= 0) {
        const targetIndex = Math.max(0, firstTableIndex);
        if (typeof arrowNode.setZIndex === "function")
          arrowNode.setZIndex(targetIndex);
      } else {
        if (typeof arrowNode.setZIndex === "function")
          arrowNode.setZIndex(children.length - 1);
      }
      const layer = parent.getLayer?.();
      if (layer != null && typeof layer.draw === "function") layer.draw();
    }
  } catch (ex) {
    // Ignore
  }
}
