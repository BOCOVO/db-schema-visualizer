import { FONT_FAMILY } from "@/constants/font";
import type Konva from "konva";
import { Text } from "react-konva";

const KonvaText = (props: Konva.TextConfig) => {
  return <Text fontFamily={FONT_FAMILY} {...props} />;
};

export default KonvaText;
