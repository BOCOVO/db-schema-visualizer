import { commands, ExtensionContext } from "vscode";
import { MainPanel } from "./views/panel";
import { EXTENSION_CONFIG_SESSION } from "./constants";

export function activate(context: ExtensionContext) {
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

const lunchExtension = (context: ExtensionContext) => {
  MainPanel.render(context, EXTENSION_CONFIG_SESSION);
};

export function deactivate() {}
