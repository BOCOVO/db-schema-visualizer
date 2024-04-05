import { Group } from "react-konva";

import KonvaText from "../dumb/KonvaText";

import { useGetEnum } from "@/hooks/enums";
import { useTheme } from "@/hooks/theme";
import { computeTextSize } from "@/utils/computeTextSize";
import { PADDINGS } from "@/constants/sizing";

interface EnumDetailsProps {
  enumName: string;
  y?: number;
}

const enumTextSize = computeTextSize("Enum");

const EnumDetails = ({ enumName, y }: EnumDetailsProps) => {
  const enumObject = useGetEnum(enumName);
  const theme = useTheme();

  if (enumObject === undefined) {
    return null;
  }

  const enumNameX = enumTextSize.width + PADDINGS.md;

  return (
    <Group y={y}>
      <KonvaText fontStyle="bold" fill={theme.red} text="Enum" />

      <KonvaText x={enumNameX} fill={theme.green} text={enumObject.name} />

      {enumObject.values.map((item, index) => (
        <KonvaText
          key={item.name}
          y={(index + 1) * enumTextSize.height}
          text={`- ${item.name}`}
          fill={theme.enumItem}
        />
      ))}
    </Group>
  );
};

export default EnumDetails;
