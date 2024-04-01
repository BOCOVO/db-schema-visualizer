import { type JSONTableRef } from "shared/types/tableSchema";

import type Endpoint from "@dbml/core/types/model_structure/endpoint";

export const dbmlRefEndpointToJSONTableRefEndpoint = ({
  tableName,
  fieldNames,
  relation,
}: Endpoint): JSONTableRef["endpoints"][number] => {
  return {
    relation,
    tableName,
    fieldNames,
  };
};
