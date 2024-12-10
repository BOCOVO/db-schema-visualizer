import { type CstNodeLocation, getSchema } from "@mrleebo/prisma-ast";
import { type JSONTableSchema } from "shared/types/tableSchema";
import { DiagnosticError } from "shared/types/diagnostic";

import { prismaASTToJSONTableSchema } from "./utils/transformers/prismaASTToJSONTableSchema";

export const parsePrismaToJSON = (prismaCode: string): JSONTableSchema => {
  try {
    const rawParsedSchema = getSchema(prismaCode);
    return prismaASTToJSONTableSchema(rawParsedSchema);
  } catch (error) {
    if ("token" in (error as any)) {
      const token = (error as any).token as CstNodeLocation;

      const endColumn = token.endColumn;
      const endLine = token.endLine;
      const startColumn = token.startColumn;
      const startLine = token.startLine;

      if (
        endColumn === undefined ||
        startColumn === undefined ||
        endLine === undefined ||
        startLine === undefined
      ) {
        throw error;
      }

      const locationEnd = { column: endColumn, line: endLine };
      const locationStart = {
        column: startColumn,
        line: startLine,
      };

      throw new DiagnosticError(
        {
          end: {
            column: locationEnd.column - 1,
            line: locationEnd.line - 1,
          },
          start: {
            column: locationStart.column - 1,
            line: locationStart.line - 1,
          },
        },
        String((error as Error).message),
      );
    }

    throw error;
  }
};
