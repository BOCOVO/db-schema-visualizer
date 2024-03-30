import { Path } from "react-konva";

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

  const highlight =
    hoveredTableName === sourceTableName ||
    hoveredTableName === targetTableName;

  return (
    <Path
      data={path}
      strokeWidth={2}
      stroke={highlight ? theme.connection.active : theme.connection.default}
    />
  );
};

export default ConnectionPath;
