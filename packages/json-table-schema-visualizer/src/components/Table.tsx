import {
  COLUMN_HEIGHT,
  PADDINGS,
  TABLE_COLOR_HEIGHT,
  TABLE_HEADER_HEIGHT,
  TABLE_WIDTH,
} from "@/constants/sizing";
import { useTheme } from "@/hooks/theme";
import { Group, Rect } from "react-konva";
import TableHeader from "./TableHeader";
import Column from "./Column";
import eventEmitter from "@/events-emitter";
import { computeTableDragEventName } from "@/utils/eventName";

import type { JSONTableTable } from "shared/types/tableSchema";
import type { KonvaEventObject } from "konva/lib/Node";
import { useEffect, useRef } from "react";
import type Konva from "konva";

interface TableProps extends JSONTableTable {}

const Table = ({ fields, name }: TableProps) => {
  const theme = useTheme();
  const tableRef = useRef<null | Konva.Group>(null);

  useEffect(() => {
    if (tableRef.current != null) {
      propagateCoordinates(tableRef.current);
    }
  }, []);

  const tableHeight =
    TABLE_COLOR_HEIGHT * 2 + COLUMN_HEIGHT + fields.length * COLUMN_HEIGHT;

  const tableDragEventName = computeTableDragEventName(name);

  const propagateCoordinates = (node: Konva.Group) => {
    eventEmitter.emit(tableDragEventName, { x: node.x(), y: node.y() });
  };

  const handleOnDrag = (event: KonvaEventObject<DragEvent>) => {
    propagateCoordinates(event.target as Konva.Group);
  };

  return (
    <Group
      ref={tableRef}
      draggable
      onDragMove={handleOnDrag}
      width={TABLE_WIDTH}
      height={tableHeight}
    >
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
