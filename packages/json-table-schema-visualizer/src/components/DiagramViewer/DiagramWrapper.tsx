import { Group, Layer, Stage } from "react-konva";
import { useEffect, useRef, type ReactNode } from "react";
import { type KonvaEventObject } from "konva/lib/Node";

import Toolbar from "../Toolbar/Toolbar";

import type { Stage as CoreStage } from "konva/lib/Stage";

import { useWindowSize } from "@/hooks/window";
import { useCursorChanger } from "@/hooks/cursor";
import { DIAGRAM_PADDING } from "@/constants/sizing";
import { useThemeColors, useThemeContext } from "@/hooks/theme";
import { Theme } from "@/types/theme";
import { useStageStartingState } from "@/hooks/stage";
import { stageStateStore } from "@/stores/stagesState";
import { useScrollDirectionContext } from "@/hooks/scrollDirection";
import { ScrollDirection } from "@/types/scrollDirection";
import eventEmitter from "@/events-emitter";
import { tableCoordsStore } from "@/stores/tableCoords";
import { useTablesInfo } from "@/hooks/table";

interface DiagramWrapperProps {
  children: ReactNode;
}

const DiagramWrapper = ({ children }: DiagramWrapperProps) => {
  const scaleBy = 1.02;
  const { height: windowHeight, width: windowWidth } = useWindowSize();
  const { theme } = useThemeContext();
  const { scrollDirection } = useScrollDirectionContext();
  const { onChange: onGrabbing, onRestore: onGrabRelease } =
    useCursorChanger("grabbing");
  const themeColors = useThemeColors();
  const stageRef = useRef<null | CoreStage>(null);
  const {
    hoveredTableName,
    setHoveredTableName,
    highlightedColumns,
    setHighlightedColumns,
  } = useTablesInfo();

  // repositioning the stage only once
  const { scale: defaultStageScale, position: defaultStagePosition } =
    useStageStartingState();
  useEffect(() => {
    if (stageRef.current != null) {
      stageRef.current.scale({
        x: defaultStageScale,
        y: defaultStageScale,
      });
      stageRef.current.position(defaultStagePosition);
    }
  }, [defaultStageScale, defaultStagePosition]);

  const handleZooming = (e: KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();
    const stage = e.currentTarget as CoreStage;
    const oldScale = stage.scaleX();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const pointer = stage.getPointerPosition()!;

    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };

    // how to scale? Zoom in? Or zoom out?
    let direction = 0;
    if (scrollDirection === ScrollDirection.UpOut) {
      direction = e.evt.deltaY > 0 ? 1 : -1;
    } else if (scrollDirection === ScrollDirection.UpIn) {
      direction = e.evt.deltaY > 0 ? -1 : 1;
    }

    // when we zoom on trackpad, e.evt.ctrlKey is true
    // in that case lets revert direction
    if (e.evt.ctrlKey) {
      direction = -direction;
    }

    const newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

    stage.scale({ x: newScale, y: newScale });

    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };
    stage.position(newPos);
    stageStateStore.set({ scale: newScale, position: newPos });
  };

  const nodeBelongsToTable = (node: any): boolean => {
    let currentNode = node;
    while (currentNode != null) {
      if (
        typeof currentNode.name === "function" &&
        typeof currentNode.name() === "string"
      ) {
        const names = (currentNode.name() as string).split(/\s+/);
        if (names.some((n) => n.startsWith("table-"))) {
          return true;
        }
      }
      currentNode = currentNode.getParent?.() ?? null;
    }
    return false;
  };

  const handleStagePointerDown = (
    e: KonvaEventObject<MouseEvent | TouchEvent>,
  ) => {
    if (
      hoveredTableName == null &&
      (highlightedColumns == null || highlightedColumns.length === 0)
    )
      return;
    if (nodeBelongsToTable(e.target)) return;
    setHoveredTableName(null);
    setHighlightedColumns([]);
  };

  const fitToView = () => {
    if (stageRef.current != null) {
      const stage = stageRef.current;
      const container = stage.container();
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;

      const contentBounds = stage.getClientRect({ relativeTo: stage });
      contentBounds.x = contentBounds.x - DIAGRAM_PADDING;
      contentBounds.y = contentBounds.y - DIAGRAM_PADDING;
      contentBounds.width = contentBounds.width + 2 * DIAGRAM_PADDING;
      contentBounds.height = contentBounds.height + 2 * DIAGRAM_PADDING;
      const scaleX = containerWidth / contentBounds.width;
      const scaleY = containerHeight / contentBounds.height;
      const scale = Math.min(scaleX, scaleY);

      stage.scale({ x: scale, y: scale });
      stage.position({
        x:
          (containerWidth - contentBounds.width * scale) / 2 -
          contentBounds.x * scale,
        y:
          (containerHeight - contentBounds.height * scale) / 2 -
          contentBounds.y * scale,
      });
      stage.batchDraw();
      stageStateStore.set({ scale, position: stage.position() });
    }
  };

  /**
   * Center handler: listen for requests to center the stage on a given table
   *  when the search option is clicked.
   */
  useEffect(() => {
    const handler = ({ tableName }: { tableName: string }) => {
      if (stageRef.current == null) return;

      const stage = stageRef.current;
      const container = stage.container();
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;

      // Try to find the node by name first
      const nodeName = `table-${tableName.replace(/\s+/g, "_")}`;
      // Konva's findOne accepts a selector like `.name`
      const node = stage.findOne(`.${nodeName}`);

      // Get bounding rect relative to stage
      let rect: { x: number; y: number; width: number; height: number };
      if (node != null && typeof (node as any).getClientRect === "function") {
        rect = (node as any).getClientRect({ relativeTo: stage });
      } else {
        // Fallback to stored coords (top-left) and assume a small box
        const coords = tableCoordsStore.getCoords(tableName);
        rect = { x: coords.x, y: coords.y, width: 200, height: 100 };
      }

      const scale = stage.scaleX();

      const newPos = {
        x: containerWidth / 2 - (rect.x + rect.width / 2) * scale,
        y: containerHeight / 2 - (rect.y + rect.height / 2) * scale,
      };

      // animate stage position for a smooth pan
      try {
        (stage as any).to({
          x: newPos.x,
          y: newPos.y,
          duration: 0.45,
          onFinish: () => {
            stage.batchDraw();
            stageStateStore.set({ scale: stage.scaleX(), position: newPos });
          },
        });
      } catch (e) {
        // fallback to immediate set
        stage.position(newPos);
        stage.batchDraw();
        stageStateStore.set({ scale: stage.scaleX(), position: newPos });
      }
    };

    eventEmitter.on("table:center", handler);
    return () => {
      eventEmitter.off("table:center", handler);
    };
  }, []);

  return (
    <main
      className={`relative flex flex-col items-center ${theme === Theme.dark ? "dark" : ""}`}
    >
      <Stage
        draggable
        ref={stageRef}
        onDragStart={onGrabbing}
        onDragEnd={onGrabRelease}
        onWheel={handleZooming}
        onMouseDown={handleStagePointerDown}
        onTouchStart={handleStagePointerDown}
        width={windowWidth}
        height={windowHeight}
        style={{ width: "fit-content", backgroundColor: themeColors.bg }}
      >
        <Layer>
          <Group offsetX={-DIAGRAM_PADDING} offsetY={-DIAGRAM_PADDING}>
            {children}
          </Group>
        </Layer>
      </Stage>

      <Toolbar onFitToView={fitToView} />
    </main>
  );
};

export default DiagramWrapper;
