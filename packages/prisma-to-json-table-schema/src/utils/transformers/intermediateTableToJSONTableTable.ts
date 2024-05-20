import { type JSONTableTable } from "shared/types/tableSchema";

import { intermediateFieldToJSONTableField } from "./intermediateFieldToJSONTableField";

import {
  type FieldRelationsMap,
  type IntermediateTable,
} from "@/types/intermediateFormattedNode";

export const intermediateTableToJSONTableTable = (
  { fields: intermediateFields, name, indexes }: IntermediateTable,
  enumsSet: Set<string>,
  fieldRelationTable: FieldRelationsMap,
): JSONTableTable => {
  const fields = intermediateFields.map((intermediateField) =>
    intermediateFieldToJSONTableField(
      name,
      intermediateField,
      enumsSet,
      fieldRelationTable,
    ),
  );

  return { name, fields, indexes };
};
