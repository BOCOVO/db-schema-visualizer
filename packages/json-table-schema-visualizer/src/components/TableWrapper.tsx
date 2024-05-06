import { type JSONTableTable } from "shared/types/tableSchema";

import Table from "./Table";

import { useGetTableMinWidth } from "@/hooks/table";
import TableDimensionProvider from "@/providers/TableDimension";

interface TableWrapperProps {
  table: JSONTableTable;
}

const TableWrapper = ({ table }: TableWrapperProps) => {
  const width = useGetTableMinWidth(table);

  return (
    <TableDimensionProvider width={width}>
      <Table {...table} />
    </TableDimensionProvider>
  );
};

export default TableWrapper;
