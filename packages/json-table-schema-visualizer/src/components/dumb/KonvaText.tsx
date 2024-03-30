import { Text } from "react-konva";

import type Konva from "konva";

import { FONT_FAMILY } from "@/constants/font";

const KonvaText = (props: Konva.TextConfig) => {
  return <Text fontFamily={FONT_FAMILY} {...props} />;
};

export default KonvaText;
