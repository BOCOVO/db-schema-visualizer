import { Path } from "react-konva";
import { useState } from "react";

import { useTheme } from "@/hooks/theme";
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
  const theme = useTheme();
  const { hoveredTableName } = useTablesInfo();
  const sourceTableColors = useTableColor(relationOwner);
  const [isHovered, setIsHovered] = useState(false);

  const highlight =
    hoveredTableName === sourceTableName ||
    hoveredTableName === targetTableName ||
    isHovered;

  const strokeColor = highlight
    ? sourceTableColors?.regular ?? theme.connection.active
    : theme.connection.default;

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
