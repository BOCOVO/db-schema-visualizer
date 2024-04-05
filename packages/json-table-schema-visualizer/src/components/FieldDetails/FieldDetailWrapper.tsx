import { Group, Line, Rect } from "react-konva";
import { useState, type ReactNode } from "react";

import { COLUMN_HEIGHT, PADDINGS, TABLE_WIDTH } from "@/constants/sizing";
import { useTheme } from "@/hooks/theme";
import { computeCaretPoints } from "@/utils/computeCaretPoints";

interface FieldDetailWrapperProps {
  children: ReactNode;
}

const FieldDetailWrapper = ({ children }: FieldDetailWrapperProps) => {
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const theme = useTheme();

  const handleOnHover = () => {
    setIsDetailVisible(true);
  };

  const handleOnLeave = () => {
    setIsDetailVisible(false);
  };

  const popoverX = TABLE_WIDTH;

  return (
    <Group
      onMouseEnter={handleOnHover}
      onMouseLeave={handleOnLeave}
      x={0}
      y={0}
      height={COLUMN_HEIGHT}
      width={TABLE_WIDTH}
    >
      <Rect x={0} y={0} height={COLUMN_HEIGHT} width={TABLE_WIDTH} />

      {isDetailVisible ? (
        <Line
          fill={theme.noteBg}
          closed
          points={computeCaretPoints(popoverX, COLUMN_HEIGHT)}
        />
      ) : null}
      <Group x={TABLE_WIDTH}>
        <Group x={PADDINGS.xs}>{isDetailVisible ? children : null}</Group>
      </Group>
    </Group>
  );
};

export default FieldDetailWrapper;
