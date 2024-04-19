import { type JSONTableTable } from "shared/types/tableSchema";

import { dbmlFieldToJSONTableField } from "./dbmlFieldToJSONTableField";
import { dbmlIndexToJSONTableIndex } from "./dbmlIndexToJSONTableIndex";

import type Table from "@dbml/core/types/model_structure/table";

export const dbmlTableToJSONTableTable = (
  { name, note, fields, indexes }: Table,
  relationalFieldMap: Map<string, string[]>,
  enumsMap: Set<string>,
): JSONTableTable => {
  return {
    name,
    // the note returned by the dbml parser is not string
    // but an object there is an typing error in their package
    note: (note as any)?.value,
    fields: fields.map((field) =>
      dbmlFieldToJSONTableField({
        field,
        enumsSet: enumsMap,
        relationalFieldMap,
        ownerTable: name,
      }),
    ),
    indexes: indexes.map(dbmlIndexToJSONTableIndex),
  };
};
