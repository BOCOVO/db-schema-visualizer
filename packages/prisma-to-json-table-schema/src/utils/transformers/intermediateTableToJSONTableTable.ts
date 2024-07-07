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
  tablesSet: Set<string>,
): JSONTableTable => {
  const fields: JSONTableTable["fields"] = [];

  for (let index = 0; index < intermediateFields.length; index++) {
    const intermediateField = intermediateFields[index];

    /* 
    VirtualReferenceField is field that not a column in the database
    but just a reference field for Prisma to allow navigation between
    relationships.
    */
    const isVirtualReferenceField = tablesSet.has(
      intermediateField.type.type_name,
    );
    if (isVirtualReferenceField) {
      continue;
    }

    const field = intermediateFieldToJSONTableField(
      name,
      intermediateField,
      enumsSet,
      fieldRelationTable,
    );
    fields.push(field);
  }

  return { name, fields, indexes };
};
