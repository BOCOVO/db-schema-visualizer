import { type ReactNode, useState } from "react";
import { Group, Rect } from "react-konva";

import { COLUMN_HEIGHT, TABLE_WIDTH } from "@/constants/sizing";
import { useTheme } from "@/hooks/theme";
import { useTablesInfo } from "@/hooks/table";
import { shouldHighLightCol } from "@/utils/shouldHighLightCol";

interface ColumnWrapperProps {
  children: ReactNode;
  offsetY?: number;
  tableName: string;
  relationalTables?: Set<string> | null;
}

const ColumnWrapper = ({
  children,
  offsetY,
  tableName,
  relationalTables,
}: ColumnWrapperProps) => {
  const theme = useTheme();
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
        fill={highlighted ? theme.colAccent : "transparent"}
        width={TABLE_WIDTH}
        height={COLUMN_HEIGHT}
      />
      {children}
    </Group>
  );
};

export default ColumnWrapper;
