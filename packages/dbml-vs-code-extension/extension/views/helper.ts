import { Disposable, ExtensionContext, Webview } from "vscode";
import {
  WebviewCommand,
  WebviewPostMessage,
} from "@/extension/types/webviewCommand";
import { WEBVIEW_HTML_MARKER_FOR_DEFAULT_CONFIG } from "@/extension/constants";
import { DefaultPageConfig } from "@/extension/types/defaultPageConfig";
import { ExtensionConfig } from "@/extension/helper/extensionConfigs";
import { Theme } from "json-table-schema-visualizer/src/types/theme";

export class WebviewHelper {
  public static setupHtml(
    webview: Webview,
    context: ExtensionContext,
    defaultConfig: DefaultPageConfig,
  ): string {
    const html = process.env.VITE_DEV_SERVER_URL
      ? /* @ts-ignore */
        /* @ts-ignore */ __getWebviewHtml__(process.env.VITE_DEV_SERVER_URL)
      : __getWebviewHtml__(webview, context);

    return WebviewHelper.injectDefaultConfig(html, defaultConfig);
  }

  public static injectDefaultConfig(
    html: string,
    configs: DefaultPageConfig,
  ): string {
    return html.replace(
      WEBVIEW_HTML_MARKER_FOR_DEFAULT_CONFIG,
      `
       window.EXTENSION_DEFAULT_CONFIG = ${JSON.stringify(configs)};
      `,
    );
  }

  public static handleWebviewMessage(
    command: string,
    message: string,
    extensionConfig: ExtensionConfig,
  ): void {
    switch (command) {
      case WebviewCommand.SET_THEME_PREFERENCES:
        extensionConfig.setTheme(message as Theme);
        return;
      default:
        return;
    }
  }

  public static setupWebviewHooks(
    webview: Webview,
    extensionConfig: ExtensionConfig,
    disposables: Disposable[],
  ) {
    webview.onDidReceiveMessage(
      (message: WebviewPostMessage) => {
        const command = message.command;
        const textMessage = message.message;
        console.log("Received message", command, textMessage);
        WebviewHelper.handleWebviewMessage(
          command,
          textMessage,
          extensionConfig,
        );
      },
      undefined,
      disposables,
    );
  }
}
