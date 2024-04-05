import { Text } from "react-konva";

import type Konva from "konva";

import { FONT_FAMILY } from "@/constants/font";
import { FONT_SIZES } from "@/constants/sizing";

const KonvaText = (props: Konva.TextConfig) => {
  return <Text fontFamily={FONT_FAMILY} fontSize={FONT_SIZES.md} {...props} />;
};

export default KonvaText;
