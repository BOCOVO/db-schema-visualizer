import {
  type JSONTableEnum,
  type JSONTableRef,
  type JSONTableTable,
} from "shared/types/tableSchema";

import Tables from "./Tables";
import RelationsConnections from "./Connections";
import DiagramWrapper from "./DiagramWrapper";

import TablesPositionsProvider from "@/providers/TablesPositionsProvider";
import MainProviders from "@/providers/MainProviders";

interface DiagramViewerProps {
  tables: JSONTableTable[];
  refs: JSONTableRef[];
  enums: JSONTableEnum[];
}

const DiagramViewer = ({ refs, tables, enums }: DiagramViewerProps) => {
  return (
    <TablesPositionsProvider tables={tables}>
      <MainProviders tables={tables} enums={enums}>
        <DiagramWrapper>
          <RelationsConnections refs={refs} />

          <Tables tables={tables} />
        </DiagramWrapper>
      </MainProviders>
    </TablesPositionsProvider>
  );
};

export default DiagramViewer;
