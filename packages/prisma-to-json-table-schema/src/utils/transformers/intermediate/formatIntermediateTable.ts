import { type Model } from "@mrleebo/prisma-ast";

import { formatIntermediateTableField } from "./formatIntermediateField";
import { lookForRelation } from "./lookForRelation";

import {
  type IntermediateTable,
  type RawRelationInfo,
  type RelationType,
} from "@/types/intermediateFormattedNode";
import { isField } from "@/utils/isTypeOf";

export const formatIntermediateTable = (
  node: Model,
  registerRawRelation: (info: RawRelationInfo) => void,
  registerInverseRelation: (name: string, info: RelationType) => void,
): IntermediateTable => {
  const fields: IntermediateTable["fields"] = [];

  for (const mayAField of node.properties) {
    if (!isField(mayAField)) continue;

    const field = formatIntermediateTableField(mayAField);
    lookForRelation(
      mayAField,
      node.name,
      registerRawRelation,
      registerInverseRelation,
    );

    fields.push(field);
  }

  return {
    fields,
    name: node.name,
    indexes: [], // TODO : also format indexes,
  };
};
