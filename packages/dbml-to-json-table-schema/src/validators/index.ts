import { type RawDatabase } from "@dbml/core/types/model_structure/database";

import { validateRefs } from "./validateRefs";

export const validateSchema = (schema: RawDatabase): void => {
  validateRefs(schema.refs, schema.tables);
};
