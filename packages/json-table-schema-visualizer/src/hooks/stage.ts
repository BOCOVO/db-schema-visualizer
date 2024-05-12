import { useMemo } from "react";

import { useWindowSize } from "./window";

import { DIAGRAM_PADDING, STAGE_SCALE_FACTOR } from "@/constants/sizing";
import { type StageState } from "@/types/stage";
import { stageStateStore } from "@/stores/stagesState";
import { tableCoordsStore } from "@/stores/tableCoords";

export const useStageStartingState = (): StageState => {
  const { height: windowHeight, width: windowWidth } = useWindowSize();

  const state = useMemo(() => {
    const savedStageState = stageStateStore.getCurrentStageState();
    if (savedStageState !== null) {
      return savedStageState;
    }

    let maxX = 0;
    let maxY = 0;
    let minX = 0;
    let minY = 0;

    tableCoordsStore.getCurrentStore().forEach(({ x, y }) => {
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

    const state = {
      scale,
      position: { x: centerPositionX, y: centerPositionY },
    };

    return state;
  }, []);

  return state;
};
