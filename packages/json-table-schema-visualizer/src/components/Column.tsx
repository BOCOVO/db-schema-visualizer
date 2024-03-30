import { COLUMN_HEIGHT, PADDINGS, TABLE_WIDTH } from "@/constants/sizing";
import { Group, Rect } from "react-konva";
import KonvaText from "./dumb/KonvaText";
import { useTheme } from "@/hooks/theme";
import { useState } from "react";

interface ColumnProps {
  colName: string;
  type: string;
  isPrimaryKey?: boolean;
  offsetY?: number;
}

const Column = ({
  colName,
  type,
  isPrimaryKey = false,
  offsetY,
}: ColumnProps) => {
  const theme = useTheme();
  const [hovered, setHovered] = useState(false);

  const handleOnHover = () => {
    setHovered(true);
  };

  const handleOnLeave = () => {
    setHovered(false);
  };

  const colTextColor = theme.text[900];
  const typeTextColor = theme.text[700];
  const fontStyle = isPrimaryKey ? "bold" : "normal";

  return (
    <Group y={offsetY}>
      <Rect
        fill={hovered ? theme.colAccent : "transparent"}
        width={TABLE_WIDTH}
        height={COLUMN_HEIGHT}
      />

      <KonvaText
        ellipsis
        wrap="none"
        text={colName}
        fill={colTextColor}
        width={TABLE_WIDTH}
        fontStyle={fontStyle}
        padding={PADDINGS.sm}
        height={COLUMN_HEIGHT}
      />

      <KonvaText
        text={type}
        align="right"
        width={TABLE_WIDTH}
        fill={typeTextColor}
        padding={PADDINGS.sm}
        fontStyle={fontStyle}
        height={COLUMN_HEIGHT}
        onMouseOver={handleOnHover}
        onMouseLeave={handleOnLeave}
      />
    </Group>
  );
};

export default Column;
