import { Path } from "react-konva";
import { useState } from "react";

import { useThemeColors } from "@/hooks/theme";
import { useTablesInfo } from "@/hooks/table";
import { useTableColor } from "@/hooks/tableColor";

interface ConnectionPathProps {
  path: string;
  sourceTableName: string;
  targetTableName: string;
  relationOwner: string;
}
const ConnectionPath = ({
  path,
  sourceTableName,
  targetTableName,
  relationOwner,
}: ConnectionPathProps) => {
  const themeColors = useThemeColors();
  const { hoveredTableName } = useTablesInfo();
  const sourceTableColors = useTableColor(relationOwner);
  const [isHovered, setIsHovered] = useState(false);

  const highlight =
    hoveredTableName === sourceTableName ||
    hoveredTableName === targetTableName ||
    isHovered;

  const strokeColor = highlight
    ? sourceTableColors?.regular ?? themeColors.connection.active
    : themeColors.connection.default;

  const handleOnHover = () => {
    setIsHovered(true);
  };

  const handleOnBlur = () => {
    setIsHovered(false);
  };

  return (
    <Path
      data={path}
      onMouseEnter={handleOnHover}
      onMouseLeave={handleOnBlur}
      strokeWidth={2}
      stroke={strokeColor}
    />
  );
};

export default ConnectionPath;
