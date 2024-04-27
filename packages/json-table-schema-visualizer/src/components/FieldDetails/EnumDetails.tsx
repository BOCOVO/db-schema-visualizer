import { Group } from "react-konva";

import KonvaText from "../dumb/KonvaText";

import { useGetEnum } from "@/hooks/enums";
import { useThemeColors } from "@/hooks/theme";
import { computeTextSize } from "@/utils/computeTextSize";
import { PADDINGS } from "@/constants/sizing";
import { createEnumItemText } from "@/utils/createEnumItemText";

interface EnumDetailsProps {
  enumName: string;
  y?: number;
}

const enumTextSize = computeTextSize("Enum");

const EnumDetails = ({ enumName, y }: EnumDetailsProps) => {
  const enumObject = useGetEnum(enumName);
  const themeColors = useThemeColors();

  if (enumObject === undefined) {
    return null;
  }

  const enumNameX = enumTextSize.width + PADDINGS.md;

  return (
    <Group y={y}>
      <KonvaText fontStyle="bold" fill={themeColors.red} text="Enum" />

      <KonvaText
        x={enumNameX}
        fill={themeColors.green}
        text={enumObject.name}
      />

      {enumObject.values.map((item, index) => (
        <KonvaText
          key={item.name}
          y={(index + 1) * enumTextSize.height}
          text={createEnumItemText(item.name)}
          fill={themeColors.enumItem}
        />
      ))}
    </Group>
  );
};

export default EnumDetails;
