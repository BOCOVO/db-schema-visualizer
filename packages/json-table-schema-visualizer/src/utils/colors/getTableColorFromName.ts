import type { TableColors } from "@/types/tableColor";

import { tableColors } from "@/constants/colors";

export const getTableColorFromName = (str: string): TableColors => {
  const numColors = tableColors.length;

  let sum = 0;
  for (let i = 0; i < str.length; i++) {
    sum += str.charCodeAt(i);
  }

  const index = sum % numColors;

  return tableColors[index];
};
