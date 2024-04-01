import { type JSONTableIndexColumn } from "shared/types/tableSchema";

import type IndexColumn from "@dbml/core/types/model_structure/indexColumn";

export const dbmlIndexColToJSONTableIndexCol = ({
  type,
  value,
}: IndexColumn): JSONTableIndexColumn => {
  return {
    type,
    value,
  };
};
