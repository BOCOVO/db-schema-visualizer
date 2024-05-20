import { type Schema } from "@mrleebo/prisma-ast";
import { type JSONTableSchema } from "shared/types/tableSchema";

import { createIntermediateSchema } from "./intermediate/createIntermediateSchema";
import { createRefsAndFieldRelationsArray } from "./createRefsFromPrismaASTNodes";
import { intermediateTableToJSONTableTable } from "./intermediateTableToJSONTableTable";

export const prismaASTToJSONTableSchema = (
  prismaAST: Schema,
): JSONTableSchema => {
  const {
    enums,
    tables: intermediateTables,
    enumsNames,
    rawRelations,
    inverseRelationMap,
    tablesNames,
  } = createIntermediateSchema(prismaAST.list);

  const [refs, fieldRelationsArray] = createRefsAndFieldRelationsArray(
    rawRelations,
    inverseRelationMap,
    tablesNames,
  );

  const tables = intermediateTables.map((intermediateTable) => {
    return intermediateTableToJSONTableTable(
      intermediateTable,
      enumsNames,
      fieldRelationsArray,
    );
  });

  return { tables, enums, refs };
};
