import { useMemo } from "react";

import { useTablePositionContext } from "./table";
import { useWindowSize } from "./window";

import { DIAGRAM_PADDING, STAGE_SCALE_FACTOR } from "@/constants/sizing";
import { type StageState } from "@/types/stage";

export const useStageStartingState = (): StageState => {
  const { tablesPositions } = useTablePositionContext();
  const { height: windowHeight, width: windowWidth } = useWindowSize();

  const state = useMemo(() => {
    let maxX = 0;
    let maxY = 0;
    let minX = 0;
    let minY = 0;

    tablesPositions.forEach(({ x, y }) => {
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
    });

    const contentW = maxX - minX;
    const contentH = maxY - minY;
    const scaleX = (windowWidth - DIAGRAM_PADDING) / contentW;
    const scaleY = (windowHeight - DIAGRAM_PADDING) / contentH;
    const scale =
      Math.min(scaleX, scaleY, 1 /* scale must not ne higher than 1 */) *
      STAGE_SCALE_FACTOR;

    const scaledW = contentW * scale;
    const scaledH = contentH * scale;

    const centerPositionX = -minX * scale + (windowWidth - scaledW) / 4;
    const centerPositionY = -minY * scale + (windowHeight - scaledH) / 4;

    return { scale, position: { x: centerPositionX, y: centerPositionY } };
  }, []);

  return state;
};
