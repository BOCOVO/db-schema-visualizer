import { type ReactNode, useState } from "react";
import { Group, Rect } from "react-konva";

import { COLUMN_HEIGHT, TABLE_WIDTH } from "@/constants/sizing";
import { useTablesInfo } from "@/hooks/table";
import { shouldHighLightCol } from "@/utils/shouldHighLightCol";

interface ColumnWrapperProps {
  children: (highlighted: boolean) => ReactNode;
  offsetY?: number;
  tableName: string;
  relationalTables?: string[] | null;
  highlightColor: string;
}

const ColumnWrapper = ({
  children,
  offsetY,
  tableName,
  relationalTables,
  highlightColor,
}: ColumnWrapperProps) => {
  const { hoveredTableName } = useTablesInfo();
  const [hovered, setHovered] = useState(false);

  const handleOnHover = () => {
    setHovered(true);
  };

  const handleOnLeave = () => {
    setHovered(false);
  };

  const highlighted = shouldHighLightCol(
    hovered,
    tableName,
    hoveredTableName,
    relationalTables,
  );

  return (
    <Group onMouseOver={handleOnHover} onMouseLeave={handleOnLeave} y={offsetY}>
      <Rect
        fill={highlighted ? highlightColor : "transparent"}
        width={TABLE_WIDTH}
        height={COLUMN_HEIGHT}
      />
      {children(highlighted)}
    </Group>
  );
};

export default ColumnWrapper;
