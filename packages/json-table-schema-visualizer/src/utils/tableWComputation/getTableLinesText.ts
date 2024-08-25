import { type JSONTableTable } from "shared/types/tableSchema";

export const getTableLinesText = (
  fields: JSONTableTable["fields"],
): string[] => {
  const stringColsNames = fields.map(
    (field) => `${field.name} ${field.type.type_name}`,
  );

  return stringColsNames;
};
