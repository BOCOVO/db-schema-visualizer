import {
  type JSONTableEnum,
  type JSONTableRef,
  type JSONTableTable,
} from "shared/types/tableSchema";

import Tables from "./Tables";
import RelationsConnections from "./Connections";
import DiagramWrapper from "./DiagramWrapper";

import { type ThemeConfigValue } from "@/types/theme";
import TablesPositionsProvider from "@/providers/TablesPositionsProvider";
import MainProviders from "@/providers/MainProviders";
import ThemeProvider from "@/providers/ThemeProvider";

interface DiagramViewerProps {
  tables: JSONTableTable[];
  refs: JSONTableRef[];
  theme: ThemeConfigValue;
  enums: JSONTableEnum[];
}
const DiagramViewer = ({ refs, tables, theme, enums }: DiagramViewerProps) => {
  return (
    <TablesPositionsProvider tables={tables}>
      <ThemeProvider theme={theme}>
        <MainProviders tables={tables} enums={enums}>
          <DiagramWrapper>
            <RelationsConnections refs={refs} />

            <Tables tables={tables} />
          </DiagramWrapper>
        </MainProviders>
      </ThemeProvider>
    </TablesPositionsProvider>
  );
};

export default DiagramViewer;
