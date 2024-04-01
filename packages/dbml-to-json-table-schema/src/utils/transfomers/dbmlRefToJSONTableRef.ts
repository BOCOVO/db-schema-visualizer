import { type JSONTableRef } from "shared/types/tableSchema";

import { dbmlRefEndpointToJSONTableRefEndpoint } from "./dbmlRefEndpointToJSONTableRefEndpoint";

import type Ref from "@dbml/core/types/model_structure/ref";


export const dbmlRefToJSONTableRef = (ref: Ref): JSONTableRef => {
  return {
    name: ref.name,
    endpoints: ref.endpoints.map(dbmlRefEndpointToJSONTableRefEndpoint),
  };
};
