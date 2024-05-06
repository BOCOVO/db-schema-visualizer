import { type JSONTableTable } from "shared/types/tableSchema";

import TableWrapper from "../TableWrapper";

interface TablesProps {
  tables: JSONTableTable[];
}

const Tables = ({ tables }: TablesProps) => {
  return tables.map((table) => <TableWrapper key={table.name} table={table} />);
};

export default Tables;
