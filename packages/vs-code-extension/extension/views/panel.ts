import {
  Disposable,
  ExtensionContext,
  TextDocument,
  ViewColumn,
  WebviewPanel,
  window,
  workspace,
} from "vscode";
import { WebviewHelper } from "./helper";
import { parseDBMLToJSON } from "dbml-to-json-table-schema";
import {
  DIAGRAM_UPDATER_DEBOUNCE_TIME,
  WEB_VIEW_NAME,
  WEB_VIEW_TITLE,
} from "../constants";

export class MainPanel {
  public static currentPanel: MainPanel | undefined;
  private readonly _panel: WebviewPanel;
  private _disposables: Disposable[] = [];
  // to add debouncing on diagram update after a file change
  private _lastTimeout: NodeJS.Timeout | null = null;

  private constructor(panel: WebviewPanel, context: ExtensionContext) {
    this._panel = panel;

    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
    this._panel.webview.html = WebviewHelper.setupHtml(
      this._panel.webview,
      context,
    );
  }

  /**
   * listen for file changes and update the diagram
   */
  public static registerDiagramUpdaterOnfFileChange() {
    const disposable = workspace.onDidChangeTextDocument(async (event) => {
      if (event.document.languageId === "dbml") {
        if (MainPanel.currentPanel?._lastTimeout) {
          clearTimeout(MainPanel.currentPanel?._lastTimeout);
        }

        MainPanel.currentPanel!._lastTimeout = setTimeout(() => {
          MainPanel.publishSchema(event.document);
        }, DIAGRAM_UPDATER_DEBOUNCE_TIME);
      }
    });

    MainPanel.currentPanel?._disposables.push(disposable);
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
      MainPanel.registerDiagramUpdaterOnfFileChange();
    }

    MainPanel.publishSchema(editor.document);
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

  static publishSchema = (document: TextDocument) => {
    const dbmlContent = document.getText();
    try {
      const schema = parseDBMLToJSON(dbmlContent);

      this.currentPanel?._panel.webview.postMessage({
        type: "setSchema",
        payload: schema,
      });
    } catch (error) {
      window.showErrorMessage(`${error}`);
    }
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
