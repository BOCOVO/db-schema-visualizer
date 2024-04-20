import { Path } from "react-konva";
import { useState } from "react";

import { useTheme } from "@/hooks/theme";
import { useTablesInfo } from "@/hooks/table";

interface ConnectionPathProps {
  path: string;
  sourceTableName: string;
  targetTableName: string;
}
const ConnectionPath = ({
  path,
  sourceTableName,
  targetTableName,
}: ConnectionPathProps) => {
  const theme = useTheme();
  const { hoveredTableName } = useTablesInfo();
  const [isHovered, setIsHovered] = useState(false);

  const highlight =
    hoveredTableName === sourceTableName ||
    hoveredTableName === targetTableName ||
    isHovered;

  const strokeColor = highlight
    ? theme.connection.active
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
