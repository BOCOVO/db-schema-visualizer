import type {
  JSONTableField,
  JSONTableSchema,
  JSONTableTable,
} from "shared/types/tableSchema";

export type RelationType = "one" | "many";
export type RelationMap = Map<string, RelationType>;
export type RawRelation = RawRelationInfo[];

/**
 * @property {string} key - a combination of the table and field concerned.
 * @property {string[]} value - list of tables with which it has a relationship
 */
export type FieldRelationsMap = Map<string, string[]>;

export interface RawRelationInfo {
  table: string;
  field: string;
  name?: string;
  referenceTable: string;
  referenceField: string;
}

// exclude the default `type` because before the first grouping, enums
// are enums not yet known
export interface IntermediateField
  extends Omit<JSONTableField, "is_relation" | "relational_tables" | "type"> {
  type: { type_name: string; many?: boolean };
}

export interface FieldConfig
  extends Omit<IntermediateField, "note" | "type" | "name" | "not_null"> {}

export interface IntermediateTable extends Omit<JSONTableTable, "fields"> {
  fields: IntermediateField[];
}

export interface IntermediateSchema
  extends Omit<JSONTableSchema, "refs" | "tables"> {
  tables: IntermediateTable[];
  enumsNames: Set<string>;
  rawRelations: RawRelation;
  inverseRelationMap: Map<string, RelationType>;
  tablesNames: Set<string>;
}
