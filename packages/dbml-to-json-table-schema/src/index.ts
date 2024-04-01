import { Parser } from "@dbml/core";

import { dbmlSchemaToJSONTableSchema } from "./utils/transfomers/dbmlSchemaToJSONTableSchema";

import type { JSONTableSchema } from "shared/types/tableSchema"

export const parseDBMLToJSON = (
  dbmlCode: string,
): JSONTableSchema => {
  const rawParsedSchema = Parser.parseDBMLToJSON(dbmlCode);
  return dbmlSchemaToJSONTableSchema(rawParsedSchema);
};