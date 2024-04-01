import { type JSONTableField } from "shared/types/tableSchema";
import { computeRelationalFieldKey } from "shared/utils/computeRelationalFieldKey";

import type Field from "@dbml/core/types/model_structure/field";

interface DbmlToJSONTableFieldParams {
  field: Field;
  relationalFieldMap: Map<string, Set<string>>;
  enumsSet: Set<string>;
  ownerTable: string;
}
export const dbmlFieldToJSONTableField = ({
  field: {
    name,
    pk,
    unique,
    note,
    dbdefault,
    increment,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    not_null,
    type,
  },
  relationalFieldMap,
  enumsSet: enumsMap,
  ownerTable,
}: DbmlToJSONTableFieldParams): JSONTableField => {
  const fieldKey = computeRelationalFieldKey(ownerTable, name);

  const hasRelation = relationalFieldMap.has(fieldKey);
  return {
    name,
    pk,
    unique,
    // the note returned by the dbml parser is not string
    // but an object there is an typing error in their package
    note: (note as any)?.value,
    not_null,
    type: {
      type_name: type.type_name,
      is_enum: enumsMap.has(type.type_name as string),
    },
    is_relation: hasRelation,
    relational_tables: hasRelation ? relationalFieldMap.get(fieldKey) : null,
    increment,
    dbdefault,
  };
};
