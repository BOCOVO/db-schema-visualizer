import { Group, Rect } from "react-konva";
import { useEffect, useMemo, useRef } from "react";

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
} from "@/constants/sizing";
import { useThemeColors } from "@/hooks/theme";
import eventEmitter from "@/events-emitter";
import { computeTableDragEventName } from "@/utils/eventName";
import {
  useTableDefaultPosition,
  useTablesInfo,
  useTableWidth,
} from "@/hooks/table";
import { tableCoordsStore } from "@/stores/tableCoords";
import { useTableDetailLevel } from "@/hooks/tableDetailLevel";
import { TableDetailLevel } from "@/types/tableDetailLevel";
import { filterByDetailLevel } from "@/utils/filterByDetailLevel";
import computeFieldDisplayTypeName from "@/utils/getFieldType";

interface TableProps extends JSONTableTable {}

const Table = ({ fields, name }: TableProps) => {
  const themeColors = useThemeColors();
  const { detailLevel } = useTableDetailLevel();
  const tableRef = useRef<null | Konva.Group>(null);
  const { setHoveredTableName } = useTablesInfo();
  const { x: tableX, y: tableY } = useTableDefaultPosition(name);
  const tablePreferredWidth = useTableWidth();
  const visibleFields = useMemo(() => {
    return filterByDetailLevel(fields, detailLevel);
  }, [detailLevel, fields]);
  useEffect(() => {
    if (tableRef.current != null) {
      tableRef.current.x(tableX);
      tableRef.current.y(tableY);
      eventEmitter.emit(tableDragEventName, { x: tableX, y: tableY });
    }
  }, [tableX, tableY]);

  const tableHeight =
    TABLE_COLOR_HEIGHT +
    COLUMN_HEIGHT +
    visibleFields.length * COLUMN_HEIGHT +
    PADDINGS.sm;

  const tableDragEventName = computeTableDragEventName(name);

  const propagateCoordinates = (node: Konva.Group) => {
    const tableCoords = { x: node.x(), y: node.y() };
    eventEmitter.emit(tableDragEventName, tableCoords);
    tableCoordsStore.setCoords(name, tableCoords);
  };

  const handleOnDrag = (event: KonvaEventObject<DragEvent>) => {
    event.currentTarget.moveToTop();
    propagateCoordinates(event.target as Konva.Group);
  };

  const handleOnHover = () => {
    setHoveredTableName(name);
  };

  const handleOnBlur = () => {
    setHoveredTableName(null);
  };

  const moveTableToTop = () => {
    if (tableRef.current != null) {
      tableRef.current.moveToTop();
    }
  };

  return (
    <Group
      ref={tableRef}
      draggable
      onDragMove={handleOnDrag}
      width={tablePreferredWidth}
      height={tableHeight}
      onMouseEnter={handleOnHover}
      onMouseLeave={handleOnBlur}
      onClick={moveTableToTop}
    >
      <Rect
        shadowBlur={PADDINGS.xs}
        shadowOpacity={0.2}
        shadowColor={themeColors.table.shadow}
        height={tableHeight}
        width={tablePreferredWidth}
        fill={themeColors.table.bg}
        cornerRadius={PADDINGS.sm}
      />

      <TableHeader title={name} />
      {detailLevel !== TableDetailLevel.HeaderOnly ? (
        <Group y={TABLE_HEADER_HEIGHT}>
          {visibleFields.map((field, index) => (
            <Column
              key={field.name}
              colName={field.name}
              tableName={name}
              isEnum={field.type.is_enum}
              type={computeFieldDisplayTypeName(field)}
              isPrimaryKey={field.pk}
              offsetY={index * COLUMN_HEIGHT}
              relationalTables={field.relational_tables}
              note={field.note}
            />
          ))}
        </Group>
      ) : (
        <></>
      )}
    </Group>
  );
};

export default Table;
