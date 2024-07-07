import { type JSONTableField } from "shared/types/tableSchema";

import { computeKey } from "../computeKey";

import type {
  FieldRelationsMap,
  IntermediateField,
} from "@/types/intermediateFormattedNode";

export const intermediateFieldToJSONTableField = (
  tableName: string,
  intermediateField: IntermediateField,
  enumsSet: Set<string>,
  fieldRelationTable: FieldRelationsMap,
): JSONTableField => {
  const isEnum = enumsSet.has(intermediateField.type.type_name);

  const keyInFieldRelationTable = computeKey(tableName, intermediateField.name);
  const relationship = fieldRelationTable.get(keyInFieldRelationTable);

  const field: JSONTableField = {
    ...intermediateField,
    type: {
      type_name:
        intermediateField.type.many === true
          ? `${intermediateField.type.type_name} [ ]`
          : intermediateField.type.type_name,
      is_enum: isEnum,
    },
    is_relation: relationship !== undefined && relationship.length > 0,
    relational_tables: relationship,
  };

  return field;
};
