import { createRoot } from "react-dom/client";
import "@tomjs/vscode-extension-webview/client";
import { tableCoordsStore } from "json-table-schema-visualizer/src/stores/tableCoords";

import App from "./App";

export const createExtensionApp = () => {
  // save current table position when exiting the page
  window.addEventListener("unload", () => {
    tableCoordsStore.saveCurrentStore();
  });

  const View = () => {
    return <App />;
  };

  const appWrapper = document.getElementById("app");

  if (appWrapper !== null) {
    const root = createRoot(appWrapper);
    root.render(<View />);
  }
};
