import KonvaText from "../dumb/KonvaText";
import FieldDetails from "../FieldDetails/FieldDetails";

import ColumnWrapper from "./ColumnWrapper";

import { useTableColor } from "@/hooks/tableColor";
import {
  COLUMN_HEIGHT,
  FONT_SIZES,
  PADDINGS,
  TABLE_FIELD_TYPE_PADDING,
} from "@/constants/sizing";
import { useThemeColors } from "@/hooks/theme";
import { useTableWidth } from "@/hooks/table";

interface ColumnProps {
  colName: string;
  tableName: string;
  type: string;
  isPrimaryKey?: boolean;
  isEnum: boolean;
  relationalTables?: string[] | null;
  offsetY?: number;
  note?: string;
}

const Column = ({
  colName,
  tableName,
  type,
  isPrimaryKey = false,
  offsetY,
  relationalTables,
  isEnum,
  note,
}: ColumnProps) => {
  const themeColors = useThemeColors();
  const tableColors = useTableColor(tableName);
  const tablePreferredWidth = useTableWidth();

  const colTextColor = themeColors.text[900];
  const typeTextColor = themeColors.text[700];
  const fontStyle = isPrimaryKey ? "bold" : "normal";

  return (
    <ColumnWrapper
      highlightColor={tableColors?.lighter ?? themeColors.colAccent}
      relationalTables={relationalTables}
      offsetY={offsetY}
      tableName={tableName}
    >
      {(highlighted) => (
        <>
          <KonvaText
            ellipsis
            wrap="none"
            text={colName}
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/prefer-nullish-coalescing
            fill={(highlighted && tableColors?.regular) || colTextColor}
            width={tablePreferredWidth}
            fontStyle={fontStyle}
            padding={PADDINGS.sm}
            height={COLUMN_HEIGHT}
            fontSize={FONT_SIZES.md}
          />

          <KonvaText
            text={type}
            align="right"
            width={tablePreferredWidth}
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/prefer-nullish-coalescing
            fill={(highlighted && tableColors?.regular) || typeTextColor}
            padding={TABLE_FIELD_TYPE_PADDING}
            fontStyle={fontStyle}
            fontSize={FONT_SIZES.md}
            height={COLUMN_HEIGHT}
          />

          {note != null || isEnum ? (
            <FieldDetails note={note ?? ""} enumName={type} />
          ) : null}
        </>
      )}
    </ColumnWrapper>
  );
};

export default Column;
