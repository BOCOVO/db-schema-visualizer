import { commands, ExtensionContext } from 'vscode';
import { MainPanel } from './views/panel';

export function activate(context: ExtensionContext) {
  // Add command to the extension context
  context.subscriptions.push(
    commands.registerCommand('db-diagram-visualizer.previewDiagrams', async () => {
      MainPanel.render(context);
    }),
  );
}

export function deactivate() {}
