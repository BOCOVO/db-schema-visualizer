import { type JSONTableRef } from "shared/types/tableSchema";

import { computeKey } from "../computeKey";

import type {
  FieldRelationsMap,
  IntermediateSchema,
} from "@/types/intermediateFormattedNode";

export const createRefsAndFieldRelationsArray = (
  rawRelations: IntermediateSchema["rawRelations"],
  inverseRelationMap: IntermediateSchema["inverseRelationMap"],
  tablesNames: IntermediateSchema["tablesNames"],
): [JSONTableRef[], FieldRelationsMap] => {
  const refs: JSONTableRef[] = [];
  const allFieldRelations: FieldRelationsMap = new Map();

  const appendFieldRelation = (
    fieldKey: string,
    relationName: string,
  ): void => {
    if (allFieldRelations.has(fieldKey)) {
      allFieldRelations.get(fieldKey)?.push(relationName);
    } else {
      allFieldRelations.set(fieldKey, [relationName]);
    }
  };

  rawRelations.forEach((relation) => {
    // check if invest relationship exists
    if (
      // check all table exists
      !tablesNames.has(relation.table) &&
      !tablesNames.has(relation.referenceTable)
    )
      return;

    const id = computeKey(
      relation.referenceTable,
      relation.table,
      ...(relation.name !== undefined ? [relation.name] : []),
    );
    const relationType = inverseRelationMap.get(id);
    if (relationType === undefined) return;

    const ref: JSONTableRef = {
      name: relation.name,
      endpoints: [
        {
          relation: "1",
          tableName: relation.referenceTable,
          fieldNames: [relation.referenceField],
        },
        {
          relation: relationType === "many" ? "*" : "1",
          fieldNames: [relation.field],
          tableName: relation.table,
        },
      ],
    };

    refs.push(ref);

    appendFieldRelation(
      computeKey(relation.referenceTable, relation.referenceField),
      relation.table,
    );

    appendFieldRelation(
      computeKey(relation.table, relation.field),
      relation.referenceTable,
    );
  });

  return [refs, allFieldRelations];
};
