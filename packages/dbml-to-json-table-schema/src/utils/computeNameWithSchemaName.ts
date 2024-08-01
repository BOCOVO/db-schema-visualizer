import { DEFAULT_SCHEMA_NAME } from "../constants/schema";

import type Enum from "@dbml/core/types/model_structure/enum";
import type Table from "@dbml/core/types/model_structure/table";

export const computeNameWithSchemaName = (
  objectName: string,
  schemaName?: string,
): string => {
  if (
    schemaName !== undefined &&
    schemaName !== null &&
    schemaName !== DEFAULT_SCHEMA_NAME
  ) {
    return `${schemaName}.${objectName}`;
  }

  return objectName;
};

export const getTableFullName = (table: Table): string => {
  // unfortunately the Table type from dbml package not define the schemaName property
  // while it exists
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return computeNameWithSchemaName(table.name, (table as any).schemaName);
};

export const getEnumFullName = (_enum: Enum): string => {
  // unfortunately the Enum type from dbml package not define the schemaName property
  // while it exists
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return computeNameWithSchemaName(_enum.name, (_enum as any).schemaName);
};
