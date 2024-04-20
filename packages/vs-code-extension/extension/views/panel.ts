import {
  Disposable,
  ExtensionContext,
  ViewColumn,
  WebviewPanel,
  window,
} from "vscode";
import { WebviewHelper } from "./helper";
import { parseDBMLToJSON } from "dbml-to-json-table-schema";
import { WEB_VIEW_NAME, WEB_VIEW_TITLE } from "../constants";

export class MainPanel {
  public static currentPanel: MainPanel | undefined;
  private readonly _panel: WebviewPanel;
  private _disposables: Disposable[] = [];

  private constructor(panel: WebviewPanel, context: ExtensionContext) {
    this._panel = panel;

    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
    this._panel.webview.html = WebviewHelper.setupHtml(
      this._panel.webview,
      context,
    );
  }

  public static render(context: ExtensionContext) {
    const editor = window.activeTextEditor;
    if (!editor) {
      window.showErrorMessage(
        "No active text editor found. Open a DBML file to preview it diagrams.",
      );
      return;
    }

    const activeTextEditorColumn =
      window.activeTextEditor?.viewColumn ?? ViewColumn.One;

    const previewColumn = activeTextEditorColumn + 1;

    if (MainPanel.currentPanel) {
      MainPanel.currentPanel._panel.reveal(previewColumn);
    } else {
      const panel = window.createWebviewPanel(
        WEB_VIEW_NAME,
        WEB_VIEW_TITLE,
        previewColumn,
        {
          enableScripts: true,
        },
      );

      MainPanel.currentPanel = new MainPanel(panel, context);
    }

    MainPanel.publishSchema();
  }

  static getCurrentEditor() {
    const editor = window.activeTextEditor;
    if (!editor) {
      window.showErrorMessage(
        "No active text editor found. Open a DBML file to preview it diagrams.",
      );
      return;
    }

    return editor;
  }

  static publishSchema = () => {
    const editor = MainPanel.getCurrentEditor();
    if (!editor) {
      return;
    }

    const document = editor.document;
    const dbmlContent = document.getText();
    const schema = parseDBMLToJSON(dbmlContent);

    this.currentPanel?._panel.webview.postMessage({
      type: "setSchema",
      payload: schema,
    });
  };

  /**
   * Cleans up and disposes of webview resources when the webview panel is closed.
   */
  public dispose() {
    MainPanel.currentPanel = undefined;

    // Dispose of the current webview panel
    this._panel.dispose();

    // Dispose of all disposables (i.e. commands) for the current webview panel
    while (this._disposables.length) {
      const disposable = this._disposables.pop();
      if (disposable) {
        disposable.dispose();
      }
    }
  }
}
