import { Parser } from "@dbml/core";
import pickKeys from "json-pick-keys";
import defaultPickConfig from "./configs/pickerKeys";

import type { JSONTableSchema } from "./types";

export const parseDBMLToJSON = (
  dbmlCode: string,
  pickConfig: Record<string, 0 | 1> = defaultPickConfig
): JSONTableSchema[] => {
  const rawParsedSchema = Parser.parseDBMLToJSON(dbmlCode);
  return pickKeys(rawParsedSchema, pickConfig);
};