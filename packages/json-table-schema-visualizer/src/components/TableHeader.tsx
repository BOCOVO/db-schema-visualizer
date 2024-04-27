import { Group, Rect } from "react-konva";

import KonvaText from "./dumb/KonvaText";

import {
  COLUMN_HEIGHT,
  FONT_SIZES,
  PADDINGS,
  TABLE_COLOR_HEIGHT,
  TABLE_WIDTH,
} from "@/constants/sizing";
import { useThemeColors } from "@/hooks/theme";
import { useTableColor } from "@/hooks/tableColor";

interface TableHeaderProps {
  title: string;
}

const TableHeader = ({ title }: TableHeaderProps) => {
  const themeColors = useThemeColors();
  const tableColors = useTableColor(title);

  const tableMarkerColor = tableColors?.regular ?? "red";

  return (
    <Group>
      <Rect
        cornerRadius={[PADDINGS.sm, PADDINGS.sm]}
        fill={tableMarkerColor}
        height={TABLE_COLOR_HEIGHT}
        width={TABLE_WIDTH}
      />

      <Rect
        y={TABLE_COLOR_HEIGHT}
        fill={themeColors.tableHeader.bg}
        width={TABLE_WIDTH}
        height={COLUMN_HEIGHT}
      />

      <KonvaText
        text={title}
        y={TABLE_COLOR_HEIGHT}
        fill={themeColors.tableHeader.fg}
        width={TABLE_WIDTH}
        height={COLUMN_HEIGHT}
        align="center"
        strokeWidth={PADDINGS.xs}
        padding={PADDINGS.xs}
        fontSize={FONT_SIZES.lg}
      />
    </Group>
  );
};

export default TableHeader;
