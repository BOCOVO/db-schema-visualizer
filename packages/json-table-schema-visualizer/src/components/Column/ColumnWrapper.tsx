import { type ReactNode, useState } from "react";
import { Group, Rect } from "react-konva";

import { COLUMN_HEIGHT } from "@/constants/sizing";
import { useTablesInfo, useTableWidth } from "@/hooks/table";
import { shouldHighLightCol } from "@/utils/shouldHighLightCol";

interface ColumnWrapperProps {
  children: (highlighted: boolean) => ReactNode;
  offsetY?: number;
  tableName: string;
  relationalTables?: string[] | null;
  highlightColor: string;
  columnName: string;
}

const ColumnWrapper = ({
  children,
  offsetY,
  tableName,
  relationalTables,
  highlightColor,
  columnName,
}: ColumnWrapperProps) => {
  const { hoveredTableName, highlightedColumns } = useTablesInfo();
  const [hovered, setHovered] = useState(false);
  const tablePreferredWidth = useTableWidth();

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
    highlightedColumns,
    columnName,
    relationalTables,
  );

  return (
    <Group onMouseOver={handleOnHover} onMouseLeave={handleOnLeave} y={offsetY}>
      <Rect
        fill={highlighted ? highlightColor : "transparent"}
        width={tablePreferredWidth}
        height={COLUMN_HEIGHT}
      />
      {children(highlighted)}
    </Group>
  );
};

export default ColumnWrapper;
