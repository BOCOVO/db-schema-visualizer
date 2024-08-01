import { type JSONTableField } from "shared/types/tableSchema";
import { computeRelationalFieldKey } from "shared/utils/computeRelationalFieldKey";

import { computeNameWithSchemaName } from "../computeNameWithSchemaName";

import type Field from "@dbml/core/types/model_structure/field";

interface DbmlToJSONTableFieldParams {
  field: Field;
  relationalFieldMap: Map<string, string[]>;
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
  const typeName = computeNameWithSchemaName(
    type.type_name as string,
    type.schemaName as string | undefined,
  );

  return {
    name,
    pk,
    unique,
    // the note returned by the dbml parser is not string
    // but an object there is an typing error in their package
    note: (note as any)?.value,
    not_null,
    type: {
      type_name: typeName,
      is_enum: enumsMap.has(typeName),
    },
    is_relation: hasRelation,
    relational_tables: hasRelation ? relationalFieldMap.get(fieldKey) : null,
    increment,
    dbdefault,
  };
};
