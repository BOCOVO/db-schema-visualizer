import { type JSONTableTable } from "shared/types/tableSchema";

import computeFieldDisplayTypeName from "../getFieldType";

export const getTableLinesText = (
  fields: JSONTableTable["fields"],
): string[] => {
  const stringColsNames = fields.map(
    (field) => `${field.name} ${computeFieldDisplayTypeName(field)}`,
  );

  return stringColsNames;
};
