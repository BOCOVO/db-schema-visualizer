import type { JSONTableField } from "shared/types/tableSchema";

const computeFieldDisplayTypeName = (field: JSONTableField): string => {
  if (field.not_null === true) {
    return `${field.type.type_name} (!)`;
  }
  return field.type.type_name;
};

export default computeFieldDisplayTypeName;
