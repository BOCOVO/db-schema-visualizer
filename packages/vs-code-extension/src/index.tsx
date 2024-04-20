import { createRoot } from "react-dom/client";
import '@tomjs/vscode-extension-webview/client';
import App from "./App";

const View = () => {
  return <App />;
};

const root = createRoot(document.getElementById("app")!);
root.render(<View />);
