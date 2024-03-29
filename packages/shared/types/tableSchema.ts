import type Endpoint from "@dbml/core/types/model_structure/endpoint";
import type Enum from "@dbml/core/types/model_structure/enum";
import type Field from "@dbml/core/types/model_structure/field";
import type IndexColumn from "@dbml/core/types/model_structure/indexColumn";
import type Index from "@dbml/core/types/model_structure/indexes";
import type Ref from "@dbml/core/types/model_structure/ref";
import type Table from "@dbml/core/types/model_structure/table";
import type { PartialRequired } from "./utils";

export interface JSONTableSchema {
  refs: JSONTableRef;
  enums: JSONTableEnum[];
  tables: JSONTableTable;
}

export interface JSONTableEnum
  extends PartialRequired<Pick<Enum, "name" | "note">, "name"> {}

export interface JSONTableRef extends Pick<Ref, "id" | "name"> {
  endpoints: Pick<Endpoint, "relation" | "tableName" | "fieldNames">;
}

export interface JSONTableField
  extends PartialRequired<
    Pick<
      Field,
      "name" | "pk" | "unique" | "note" | "increment" | "not_null" | "dbdefault"
    >,
    "name"
  > {
  type: { type_name: string };
}

export interface JSONTableIndexColumn
  extends Pick<IndexColumn, "type" | "value"> {}

export interface JSONTableIndex
  extends Pick<Index, "unique" | "type" | "pk" | "name" | "note"> {
  columns: JSONTableIndexColumn[];
}

export interface JSONTableTable
  extends PartialRequired<Pick<Table, "name" | "note">, "name"> {
  fields: JSONTableField[];
  indexes: JSONTableIndex[];
}
