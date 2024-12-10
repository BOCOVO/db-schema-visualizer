import { Parser, type CompilerDiagnostic } from "@dbml/core";
import { DiagnosticError } from "shared/types/diagnostic";

import { dbmlSchemaToJSONTableSchema } from "./utils/transfomers/dbmlSchemaToJSONTableSchema";
import { validateSchema } from "./validators";

import type { JSONTableSchema } from "shared/types/tableSchema";

export const parseDBMLToJSON = (dbmlCode: string): JSONTableSchema => {
  try {
    const rawParsedSchema = Parser.parseDBMLToJSON(dbmlCode);
    validateSchema(rawParsedSchema);
    return dbmlSchemaToJSONTableSchema(rawParsedSchema);
  } catch (error) {
    if ("location" in (error as any) && "message" in (error as any)) {
      const _error = error as CompilerDiagnostic;

      const locationEnd = _error.location.end;
      const locationStart = _error.location.start;

      if (locationEnd === undefined || locationStart === undefined) {
        throw error;
      }

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
        _error.message,
      );
    }
    throw error;
  }
};
