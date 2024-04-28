import { Group, Layer, Stage } from "react-konva";
import { type ReactNode } from "react";
import { type KonvaEventObject } from "konva/lib/Node";

import ThemeToggler from "../ThemeToggler/ThemeToggler";

import type { Stage as CoreStage } from "konva/lib/Stage";

import { useWindowSize } from "@/hooks/window";
import { useCursorChanger } from "@/hooks/cursor";
import { DIAGRAM_PADDING } from "@/constants/sizing";
import { useThemeColors, useThemeContext } from "@/hooks/theme";
import { Theme } from "@/types/theme";

interface DiagramWrapperProps {
  children: ReactNode;
}

const DiagramWrapper = ({ children }: DiagramWrapperProps) => {
  const scaleBy = 1.02;
  const { height, width } = useWindowSize();
  const { theme } = useThemeContext();
  const { onChange: onGrabbing, onRestore: onGrabRelease } =
    useCursorChanger("grabbing");
  const themeColors = useThemeColors();

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
    let direction = e.evt.deltaY > 0 ? 1 : -1;

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
  };

  return (
    <main className={`relative ${theme === Theme.dark ? "dark" : ""}`}>
      <Stage
        draggable
        onDragStart={onGrabbing}
        onDragEnd={onGrabRelease}
        onWheel={handleZooming}
        width={width}
        height={height}
        style={{ width: "fit-content", backgroundColor: themeColors.bg }}
      >
        <Layer>
          <Group offsetX={-DIAGRAM_PADDING} offsetY={-DIAGRAM_PADDING}>
            {children}
          </Group>
        </Layer>
      </Stage>

      <div className="absolute top-5 right-5">
        <ThemeToggler />
      </div>
    </main>
  );
};

export default DiagramWrapper;
