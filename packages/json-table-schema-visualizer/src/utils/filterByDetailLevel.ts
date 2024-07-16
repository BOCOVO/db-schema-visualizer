import { type JSONTableField } from "shared/types/tableSchema";

import { TableDetailLevel } from "@/types/tabelDetailLevel";

export function filterByDetailLevel(
  fields: JSONTableField[],
  detailLevel: TableDetailLevel,
): JSONTableField[] {
  function isFullDetail(): boolean {
    return detailLevel === TableDetailLevel.FullDetails;
  }
  function isKeyOnly(): boolean {
    return detailLevel === TableDetailLevel.KeyOnly;
  }
  function hasRelations(field: JSONTableField): boolean {
    if (!Array.isArray(field.relational_tables)) {
      return false;
    }
    return field.relational_tables.length > 0;
  }
  return fields.filter(
    (f) => isFullDetail() || (isKeyOnly() && hasRelations(f)),
  );
}
