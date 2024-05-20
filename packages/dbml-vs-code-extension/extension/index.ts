import { commands, type ExtensionContext } from "vscode";

import { parseDBMLToJSON } from "dbml-to-json-table-schema";

import { MainPanel } from "extension-shared/extension/views/panel";
import {
  EXTENSION_CONFIG_SESSION,
  WEB_VIEW_NAME,
  WEB_VIEW_TITLE,
} from "@/extension/constants";

export function activate(context: ExtensionContext): void {
  // Add command to the extension context
  context.subscriptions.push(
    commands.registerCommand(
      "dbml-erd-visualizer.previewDiagrams",
      async () => {
        lunchExtension(context);
      },
    ),
  );
}

const lunchExtension = (context: ExtensionContext): void => {
  MainPanel.render({
    context,
    extensionConfigSession: EXTENSION_CONFIG_SESSION,
    webviewConfig: {
      name: WEB_VIEW_NAME,
      title: WEB_VIEW_TITLE,
    },
    parser: parseDBMLToJSON,
    fileExt: "dbml",
  });
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function deactivate() {}
