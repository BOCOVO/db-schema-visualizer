import { Group, Rect } from "react-konva";

import KonvaText from "../dumb/KonvaText";

import EnumDetails from "./EnumDetails";
import FieldDetailWrapper from "./FieldDetailWrapper";

import { useThemeColors } from "@/hooks/theme";
import { computeFieldDetailBoxDimension } from "@/utils/computeFieldDetailBoxDimension";
import { useGetEnum } from "@/hooks/enums";
import { PADDINGS } from "@/constants/sizing";

interface FieldDetailsProps {
  note?: string;
  enumName?: string;
}

const FieldDetails = ({ note, enumName = "" }: FieldDetailsProps) => {
  const themeColors = useThemeColors();
  const enumObject = useGetEnum(enumName);

  const contentDimension = computeFieldDetailBoxDimension(note, enumObject);
  return (
    <FieldDetailWrapper>
      <Group>
        <Rect
          fill={themeColors.noteBg}
          width={contentDimension.w + PADDINGS.md * 2}
          height={contentDimension.h}
          cornerRadius={5}
        />

        <Group x={PADDINGS.md}>
          <KonvaText
            y={PADDINGS.md}
            width={contentDimension.w}
            fill={themeColors.white}
            text={note}
          />

          {enumName !== undefined ? (
            <EnumDetails y={contentDimension.noteH} enumName={enumName} />
          ) : null}
        </Group>
      </Group>
    </FieldDetailWrapper>
  );
};

export default FieldDetails;
