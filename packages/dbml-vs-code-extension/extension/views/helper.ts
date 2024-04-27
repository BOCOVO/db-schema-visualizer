import { ExtensionContext, Webview } from "vscode";

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
  }
}
