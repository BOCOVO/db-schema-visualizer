import { type JSONTableSchema } from "shared/types/tableSchema";
import { type ExtensionContext } from "vscode";

export interface WebviewConfig {
  name: string;
  title: string;
}

export interface ExtensionRenderProps {
  context: ExtensionContext;
  extensionConfigSession: string;
  webviewConfig: WebviewConfig;
  parser: (code: string) => JSONTableSchema;
  fileExt: string;
}
