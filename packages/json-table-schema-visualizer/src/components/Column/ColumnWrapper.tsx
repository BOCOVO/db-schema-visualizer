import { type ReactNode, useState } from "react";
import { Group, Rect } from "react-konva";

import { COLUMN_HEIGHT, TABLE_WIDTH } from "@/constants/sizing";
import { useTheme } from "@/hooks/theme";
import { useRelationalFieldsSet } from "@/hooks/relationConnection";
import { computeRelationalFieldKey } from "@/utils/getRefsSet";
import { useTablesInfo } from "@/hooks/table";

interface ColumnWrapperProps {
  children: ReactNode;
  offsetY?: number;
  tableName: string;
  fieldName: string;
}

const ColumnWrapper = ({
  children,
  offsetY,
  fieldName,
  tableName,
}: ColumnWrapperProps) => {
  const theme = useTheme();
  const { relationalFieldsSet } = useRelationalFieldsSet();
  const { hoveredTableName } = useTablesInfo();
  const [hovered, setHovered] = useState(false);

  const handleOnHover = () => {
    setHovered(true);
  };

  const handleOnLeave = () => {
    setHovered(false);
  };

  const fieldKey = computeRelationalFieldKey(tableName, fieldName);
  const highlighted =
    (hoveredTableName === tableName && relationalFieldsSet.has(fieldKey)) ||
    hovered;

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
