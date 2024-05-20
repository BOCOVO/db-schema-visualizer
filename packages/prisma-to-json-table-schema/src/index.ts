import { getSchema } from "@mrleebo/prisma-ast";
import { type JSONTableSchema } from "shared/types/tableSchema";

import { prismaASTToJSONTableSchema } from "./utils/transformers/prismaASTToJSONTableSchema";

export const parsePrismaToJSON = (prismaCode: string): JSONTableSchema => {
  const rawParsedSchema = getSchema(prismaCode);
  return prismaASTToJSONTableSchema(rawParsedSchema);
};
