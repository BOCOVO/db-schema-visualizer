import { type JSONTableEnum } from "shared/types/tableSchema";

import type Enum from "@dbml/core/types/model_structure/enum";

export const dbmlEnumToJSONTableEnum = ({
  values,
  name,
}: Enum): JSONTableEnum => {
  return {
    name,
    values: values.map<JSONTableEnum["values"][number]>(({ name, note }) => ({
      name,
      // the note returned by the dbml parser is not string
      // but an object there is an typing error in their package
      note: (note as any)?.value,
    })),
  };
};
