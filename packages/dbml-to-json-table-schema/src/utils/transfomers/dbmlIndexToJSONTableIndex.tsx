import { type JSONTableIndex } from "shared/types/tableSchema";

import { dbmlIndexColToJSONTableIndexCol } from "./dbmlIndexColToJSONTableIndexCol";

import type Index from "@dbml/core/types/model_structure/indexes";

export const dbmlIndexToJSONTableIndex = ({
  pk,
  unique,
  type,
  name,
  note,
  columns,
}: Index): JSONTableIndex => {
  return {
    unique,
    type,
    pk: Boolean(pk),
    name,
    // the note returned by the dbml parser is not string
    // but an object there is an typing error in their package
    note: (note as any)?.value,
    columns: columns.map(dbmlIndexColToJSONTableIndexCol),
  };
};