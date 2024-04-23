import { useEffect, useState } from "react";
import { JSONTableSchema } from "shared/types/tableSchema";
import DiagramViewer from "json-table-schema-visualizer/src/components/DiagramViewer/DiagramViewer";
import { defaultThemeConfig } from "json-table-schema-visualizer/src/constants/theme";

const App = () => {
  const [schema, setSchema] = useState<JSONTableSchema | null>(null);

  useEffect(() => {
    window.addEventListener("message", (e: MessageEvent) => {
      const message = e.data;
      if (message.type === "setSchema" && typeof message.payload === "object") {
        setSchema(message.payload);
      }
    });
  }, []);

  if (schema === null) {
    return "Loading...";
  }

  return <DiagramViewer {...schema} theme={defaultThemeConfig} />;
};

export default App;
