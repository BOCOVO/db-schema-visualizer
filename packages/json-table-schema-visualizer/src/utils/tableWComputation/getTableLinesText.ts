import { type JSONTableTable } from "shared/types/tableSchema";

export const getTableLinesText = (
  fields: JSONTableTable["fields"],
  name: string,
): string[] => {
  const stringColsNames = fields.map(
    (field) => `${field.name} ${field.type.type_name}`,
  );
  const tableLinesTexts = [name, ...stringColsNames];

  return tableLinesTexts;
};
