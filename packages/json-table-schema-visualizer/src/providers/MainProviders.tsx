import {
  type JSONTableEnum,
  type JSONTableTable,
} from "shared/types/tableSchema";
import { type ReactNode } from "react";

import TablesInfoProvider from "./TablesInfoProvider";
import EnumsProvider from "./EnumsProvider";
import TablesColorProvider from "./TablesColorProvider";

interface MainProvidersProps {
  tables: JSONTableTable[];
  enums: JSONTableEnum[];
  children: ReactNode;
}
const MainProviders = ({ enums, tables, children }: MainProvidersProps) => {
  return (
    <TablesInfoProvider tables={tables}>
      <TablesColorProvider tables={tables}>
        <EnumsProvider enums={enums}>{children}</EnumsProvider>
      </TablesColorProvider>
    </TablesInfoProvider>
  );
};

export default MainProviders;
