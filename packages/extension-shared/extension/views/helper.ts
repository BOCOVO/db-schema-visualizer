/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
/* eslint-disable @typescript-eslint/no-extraneous-class */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import { type Disposable, type ExtensionContext, type Webview } from "vscode";
import { type Theme } from "json-table-schema-visualizer/src/types/theme";

import {
  WebviewCommand,
  type WebviewPostMessage,
} from "../types/webviewCommand";
import { type DefaultPageConfig } from "../types/defaultPageConfig";
import { type ExtensionConfig } from "../helper/extensionConfigs";
import { WEBVIEW_HTML_MARKER_FOR_DEFAULT_CONFIG } from "../constants";

export class WebviewHelper {
  public static setupHtml(
    webview: Webview,
    context: ExtensionContext,
    defaultConfig: DefaultPageConfig,
  ): string {
    const html: string = process.env.VITE_DEV_SERVER_URL
      ? /* @ts-ignore */
        __getWebviewHtml__(process.env.VITE_DEV_SERVER_URL)
      : /* @ts-ignore */
        __getWebviewHtml__(webview, context);

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
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        extensionConfig.setTheme(message as Theme);
        break;
      default:
    }
  }

  public static setupWebviewHooks(
    webview: Webview,
    extensionConfig: ExtensionConfig,
    disposables: Disposable[],
  ): void {
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
