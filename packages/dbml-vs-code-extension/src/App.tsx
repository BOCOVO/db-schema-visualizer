import { useEffect, useState } from "react";
import { JSONTableSchema } from "shared/types/tableSchema";
import DiagramViewer from "json-table-schema-visualizer/src/components/DiagramViewer/DiagramViewer";
import { defaultThemeConfig } from "json-table-schema-visualizer/src/constants/theme";

const defaultSchema = {
  refs: [],
  enums: [],
  tables: [],
};

const App = () => {
  const [schema, setSchema] = useState<JSONTableSchema>(defaultSchema);

  useEffect(() => {
    window.addEventListener("message", (e: MessageEvent) => {
      const message = e.data;
      if (message.type === "setSchema" && typeof message.payload === "object") {
        setSchema(message.payload);
      }
    });
  }, []);

  return <DiagramViewer {...schema} theme={defaultThemeConfig} />;
};

export default App;
