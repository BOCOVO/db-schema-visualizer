import { type JSONTableTable } from "shared/types/tableSchema";

import Table from "../Table";

interface TablesProps {
  tables: JSONTableTable[];
}

const Tables = ({ tables }: TablesProps) => {
  return tables.map((table) => <Table key={table.name} {...table} />);
};

export default Tables;
