import {
  COLUMN_HEIGHT,
  PADDINGS,
  TABLE_COLOR_HEIGHT,
  TABLE_HEADER_HEIGHT,
  TABLE_WIDTH,
} from "@/constants/sizing";
import { useTheme } from "@/hooks/theme";
import { Group, Rect } from "react-konva";
import type { JSONTableTable } from "shared/types/tableSchema";
import TableHeader from "./TableHeader";
import Column from "./Column";

interface TableProps extends JSONTableTable {}

const Table = ({ fields, name }: TableProps) => {
  const theme = useTheme();

  const tableHeight =
    TABLE_COLOR_HEIGHT * 2 + COLUMN_HEIGHT + fields.length * COLUMN_HEIGHT;

  return (
    <Group draggable width={TABLE_WIDTH} height={tableHeight}>
      <Rect
        shadowBlur={PADDINGS.xs}
        shadowOpacity={0.2}
        shadowColor={theme.table.shadow}
        height={tableHeight}
        width={TABLE_WIDTH}
        fill={theme.table.bg}
      />

      <TableHeader title={name} />

      <Group y={TABLE_HEADER_HEIGHT}>
        {fields.map((field, index) => (
          <Column
            key={field.name}
            colName={field.name}
            type={field.type.type_name}
            isPrimaryKey={field.pk}
            offsetY={index * COLUMN_HEIGHT}
          />
        ))}
      </Group>
    </Group>
  );
};

export default Table;
