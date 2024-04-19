import KonvaText from "../dumb/KonvaText";
import FieldDetails from "../FieldDetails/FieldDetails";

import ColumnWrapper from "./ColumnWrapper";

import {
  COLUMN_HEIGHT,
  FONT_SIZES,
  PADDINGS,
  TABLE_WIDTH,
} from "@/constants/sizing";
import { useTheme } from "@/hooks/theme";

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
  const theme = useTheme();

  const colTextColor = theme.text[900];
  const typeTextColor = theme.text[700];
  const fontStyle = isPrimaryKey ? "bold" : "normal";

  return (
    <ColumnWrapper
      relationalTables={relationalTables}
      offsetY={offsetY}
      tableName={tableName}
    >
      <KonvaText
        ellipsis
        wrap="none"
        text={colName}
        fill={colTextColor}
        width={TABLE_WIDTH}
        fontStyle={fontStyle}
        padding={PADDINGS.sm}
        height={COLUMN_HEIGHT}
        fontSize={FONT_SIZES.md}
      />

      <KonvaText
        text={isEnum ? `${type} 🅴` : type}
        align="right"
        width={TABLE_WIDTH}
        fill={typeTextColor}
        padding={PADDINGS.sm}
        fontStyle={fontStyle}
        fontSize={FONT_SIZES.md}
        height={COLUMN_HEIGHT}
      />

      {note != null || isEnum ? (
        <FieldDetails note={note ?? ""} enumName={type} />
      ) : null}
    </ColumnWrapper>
  );
};

export default Column;
