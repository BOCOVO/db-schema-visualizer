import { type Field } from "@mrleebo/prisma-ast";

import { getFieldTypeName } from "../getFieldTypeName";
import { scalarFieldType } from "../../../constants/scalarFieldType";
import { isKeyValue, isRelationArray, isRelationNode } from "../../isTypeOf";

import {
  type RelationType,
  type RawRelationInfo,
} from "@/types/intermediateFormattedNode";

export const lookForRelation = (
  field: Field,
  tableName: string,
  registerRelation: (config: RawRelationInfo) => void,
  registerInverseRelation: (name: string, info: RelationType) => void,
): void => {
  const fieldType = getFieldTypeName(field.fieldType);

  let relationFields: string[] = [];
  let relationReferences: string[] = [];
  let relationName: string | undefined;

  if (field.attributes !== undefined) {
    for (const attr of field.attributes) {
      if (attr.args === undefined || !isRelationNode(attr)) continue;

      for (const argument of attr.args) {
        if (typeof argument.value === "string") {
          relationName = argument.value;
          continue;
        }

        if (!isKeyValue(argument.value)) {
          continue;
        }

        if (
          argument.value.key === "name" &&
          typeof argument.value.value === "string"
        ) {
          relationName = argument.value.value;
        }

        if (!isRelationArray(argument.value.value)) continue;

        if (argument.value.key === "fields") {
          relationFields = argument.value.value.args;
        }

        if (argument.value.key === "references") {
          relationReferences = argument.value.value.args;
        }
      }

      if (
        relationFields.length > 0 &&
        relationFields.length === relationReferences.length
      ) {
        relationReferences.forEach((referenceField) => {
          registerRelation({
            referenceField,
            referenceTable: fieldType,
            table: tableName,
            field: relationFields[0],
            name: relationName,
          });
        });

        return;
      }
    }
  }

  // check if the field is maybe a inverse relation
  // that is the if is not a scalar type and not a composite type
  if (scalarFieldType.has(fieldType)) {
    return;
  }

  const inverseKeyPrefix = `${tableName}.${fieldType}`;
  registerInverseRelation(
    relationName !== undefined
      ? `${inverseKeyPrefix}.${relationName}`
      : inverseKeyPrefix,
    field.array === true ? "many" : "one",
  );
};
