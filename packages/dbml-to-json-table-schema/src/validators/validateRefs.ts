import { TableNotExistError } from "../errors/TableNotExistError";
import { FieldNotExistsError } from "../errors/FieldNotExistsError";

import type Endpoint from "@dbml/core/types/model_structure/endpoint";
import type Ref from "@dbml/core/types/model_structure/ref";
import type Table from "@dbml/core/types/model_structure/table";


export const validateRefs = (refs: Ref[], tables: Table[]): void => {
  const tableMap = new Map<string, Table>();
  tables.forEach((table) => {
    tableMap.set(table.name, table);
  });

  refs.forEach((ref) => {
    ref.endpoints.forEach((endpoint) => {
      if (tableMap.has(endpoint.tableName)) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        validateEndpoint(endpoint, tableMap.get(endpoint.tableName)!);
        return;
      }

      throw new TableNotExistError(endpoint.tableName);
    });
  });
};

export const validateEndpoint = (endpoint: Endpoint, table: Table): void => {
  const endpointFieldName = endpoint.fieldNames[0];
  const colExists = table.fields.some(
    (field) => endpointFieldName === field.name,
  );
  if (!colExists) {
    throw new FieldNotExistsError(endpointFieldName, table.name);
  }
};
