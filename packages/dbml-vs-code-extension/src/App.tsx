import { useEffect, useState } from "react";
import { JSONTableSchema } from "shared/types/tableSchema";
import DiagramViewer from "json-table-schema-visualizer/src/components/DiagramViewer/DiagramViewer";
import { useCreateTheme } from "json-table-schema-visualizer/src/hooks/theme";
import ThemeProvider from "json-table-schema-visualizer/src/providers/ThemeProvider";
import NoSchemaMessage from "json-table-schema-visualizer/src/components/Messages/NoSchemaMessage";
import { Theme } from "json-table-schema-visualizer/src/types/theme";
import {
  WebviewCommand,
  WebviewPostMessage,
} from "@/extension/types/webviewCommand";

const App = () => {
  const [schema, setSchema] = useState<JSONTableSchema | null>(null);
  const { setTheme, theme, themeColors } = useCreateTheme(
    window.EXTENSION_DEFAULT_CONFIG?.theme,
  );

  useEffect(() => {
    window.addEventListener("message", (e: MessageEvent) => {
      const message = e.data;
      if (message.type === "setSchema" && typeof message.payload === "object") {
        setSchema(message.payload);
      }
    });
  }, []);

  if (schema === null) {
    return <NoSchemaMessage />;
  }

  // update the preference in the extension settings
  const saveThemePreference = (theme: Theme) => {
    setTheme(theme);
    const updateThemeMessage: WebviewPostMessage = {
      command: WebviewCommand.SET_THEME_PREFERENCES,
      message: theme,
    };

    if (!window.vsCodeWebviewAPI) {
      console.error(
        "can't send message to extension due vsCodeWebviewAPI global variable is not defined",
      );
    } else {
      window.vsCodeWebviewAPI?.postMessage(updateThemeMessage);
    }
  };

  return (
    <ThemeProvider
      theme={theme}
      setTheme={saveThemePreference}
      themeColors={themeColors}
    >
      <DiagramViewer {...schema} />
    </ThemeProvider>
  );
};

export default App;
