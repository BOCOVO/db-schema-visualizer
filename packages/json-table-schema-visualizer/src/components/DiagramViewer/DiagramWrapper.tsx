import { Layer, Stage } from "react-konva";
import { type ReactNode } from "react";
import { type KonvaEventObject } from "konva/lib/Node";

import type { Stage as CoreStage } from "konva/lib/Stage";

import { useWindowSize } from "@/hooks/window";

interface DiagramWrapperProps {
  children: ReactNode;
}

const DiagramWrapper = ({ children }: DiagramWrapperProps) => {
  const scaleBy = 1.02;
  const { height, width } = useWindowSize();

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
    <main>
      <Stage onWheel={handleZooming} width={width} height={height}>
        <Layer>{children}</Layer>
      </Stage>
    </main>
  );
};

export default DiagramWrapper;
