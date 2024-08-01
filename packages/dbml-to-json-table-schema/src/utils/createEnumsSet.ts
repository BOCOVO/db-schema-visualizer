import { getEnumFullName } from "./computeNameWithSchemaName";

import type Enum from "@dbml/core/types/model_structure/enum";

export const createEnumsSet = (enums: Enum[]): Set<string> => {
  const map = new Set<string>();

  enums.forEach((enumObj) => {
    map.add(getEnumFullName(enumObj));
  });

  return map;
};
