import { getFieldTypeName } from "../getFieldTypeName";
import { getFieldConfig } from "../getFieldConfig";

import type { IntermediateField } from "@/types/intermediateFormattedNode";
import type { Field } from "@mrleebo/prisma-ast";

export const formatIntermediateTableField = (
  node: Field,
): IntermediateField => {
  const fieldConfig = getFieldConfig(node.attributes);

  return {
    name: node.name,
    type: {
      type_name: getFieldTypeName(node.fieldType),
      many: node.array,
    },
    not_null: node.optional === undefined ? true : !node.optional,
    ...fieldConfig,
  };
};
