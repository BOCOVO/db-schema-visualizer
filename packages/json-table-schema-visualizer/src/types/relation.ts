import type { JSONTableRef } from "shared/types/tableSchema";

export type RelationItem = JSONTableRef["endpoints"][number];

export interface RelationalFieldsSetProviderValue {
  relationalFieldsSet: Set<string>;
}
