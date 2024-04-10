import { Group, Rect } from "react-konva";
import { useEffect, useRef } from "react";

import TableHeader from "./TableHeader";
import Column from "./Column/Column";

import type { JSONTableTable } from "shared/types/tableSchema";
import type { KonvaEventObject } from "konva/lib/Node";
import type Konva from "konva";

import {
  COLUMN_HEIGHT,
  PADDINGS,
  TABLE_COLOR_HEIGHT,
  TABLE_HEADER_HEIGHT,
  TABLE_WIDTH,
} from "@/constants/sizing";
import { useTheme } from "@/hooks/theme";
import eventEmitter from "@/events-emitter";
import { computeTableDragEventName } from "@/utils/eventName";
import { useTablePosition, useTablesInfo } from "@/hooks/table";

interface TableProps extends JSONTableTable {}

const Table = ({ fields, name }: TableProps) => {
  const theme = useTheme();
  const tableRef = useRef<null | Konva.Group>(null);
  const { setHoveredTableName } = useTablesInfo();
  const tablePosition = useTablePosition(name);

  useEffect(() => {
    if (tableRef.current != null && tablePosition.length === 2) {
      tableRef.current.x(tablePosition[0]);
      tableRef.current.y(tablePosition[1]);
    }
  }, [tablePosition]);

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

  const handleOnHover = () => {
    setHoveredTableName(name);
  };

  const handleOnBlur = () => {
    setHoveredTableName(null);
  };

  return (
    <Group
      ref={tableRef}
      draggable
      onDragMove={handleOnDrag}
      width={TABLE_WIDTH}
      height={tableHeight}
      onMouseEnter={handleOnHover}
      onMouseLeave={handleOnBlur}
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
            tableName={name}
            isEnum={field.type.is_enum}
            type={field.type.type_name}
            isPrimaryKey={field.pk}
            offsetY={index * COLUMN_HEIGHT}
            relationalTables={field.relational_tables}
            note={field.note}
          />
        ))}
      </Group>
    </Group>
  );
};

export default Table;
