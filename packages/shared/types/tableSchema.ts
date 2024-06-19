import type Endpoint from "@dbml/core/types/model_structure/endpoint";
import type Enum from "@dbml/core/types/model_structure/enum";
import type Field from "@dbml/core/types/model_structure/field";
import type IndexColumn from "@dbml/core/types/model_structure/indexColumn";
import type Index from "@dbml/core/types/model_structure/indexes";
import type Table from "@dbml/core/types/model_structure/table";
import type { PartialRequired } from "./utils";

export interface JSONTableSchema {
  refs: JSONTableRef[];
  enums: JSONTableEnum[];
  tables: JSONTableTable[];
}

export interface JSONTableEnum
  extends PartialRequired<Pick<Enum, "name">, "name"> {
  values: Array<{ name: string; note?: string }>;
}

export interface JSONTableRef {
  name?: string | null;
  endpoints: Array<Pick<Endpoint, "relation" | "tableName" | "fieldNames">>;
}

export interface JSONTableField
  extends PartialRequired<
    Pick<
      Field,
      "name" | "pk" | "unique" | "note" | "increment" | "not_null" | "dbdefault"
    >,
    "name"
  > {
  type: { type_name: string; is_enum: boolean };
  is_relation: boolean;
  relational_tables?: string[] | null;
}

export interface JSONTableIndexColumn
  extends Pick<IndexColumn, "type" | "value"> {}

export interface JSONTableIndex
  extends Partial<Pick<Index, "unique" | "type" | "name" | "note">> {
  // the parser return `pk` as boolean not string
  pk?: boolean;
  columns: JSONTableIndexColumn[];
}

export interface JSONTableTable
  extends PartialRequired<Pick<Table, "name" | "note" | "headerColor">, "name"> {
  fields: JSONTableField[];
  indexes: JSONTableIndex[];
}
