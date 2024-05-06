import { Group, Line, Rect } from "react-konva";
import { useState, type ReactNode } from "react";

import { COLUMN_HEIGHT, PADDINGS } from "@/constants/sizing";
import { useThemeColors } from "@/hooks/theme";
import { computeCaretPoints } from "@/utils/computeCaretPoints";
import { useTableWidth } from "@/hooks/table";

interface FieldDetailWrapperProps {
  children: ReactNode;
}

const FieldDetailWrapper = ({ children }: FieldDetailWrapperProps) => {
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const themeColors = useThemeColors();
  const tablePreferredWidth = useTableWidth();
  const handleOnHover = () => {
    setIsDetailVisible(true);
  };

  const handleOnLeave = () => {
    setIsDetailVisible(false);
  };

  const popoverX = tablePreferredWidth;

  return (
    <Group
      onMouseEnter={handleOnHover}
      onMouseLeave={handleOnLeave}
      x={0}
      y={0}
      height={COLUMN_HEIGHT}
      width={tablePreferredWidth}
    >
      <Rect x={0} y={0} height={COLUMN_HEIGHT} width={tablePreferredWidth} />

      {isDetailVisible ? (
        <Line
          fill={themeColors.noteBg}
          closed
          points={computeCaretPoints(popoverX, COLUMN_HEIGHT)}
        />
      ) : null}
      <Group x={tablePreferredWidth}>
        <Group x={PADDINGS.xs}>{isDetailVisible ? children : null}</Group>
      </Group>
    </Group>
  );
};

export default FieldDetailWrapper;
