import { type JSONTableEnum } from "shared/types/tableSchema";

import { getEnumFullName } from "../computeNameWithSchemaName";

import type Enum from "@dbml/core/types/model_structure/enum";

export const dbmlEnumToJSONTableEnum = (_enum: Enum): JSONTableEnum => {
  return {
    name: getEnumFullName(_enum),
    values: _enum.values.map<JSONTableEnum["values"][number]>(
      ({ name, note }) => ({
        name,
        // the note returned by the dbml parser is not string
        // but an object there is an typing error in their package
        note: (note as any)?.value,
      }),
    ),
  };
};
