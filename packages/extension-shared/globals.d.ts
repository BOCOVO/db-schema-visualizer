import { type DefaultPageConfig } from "@/extension/types/defaultPageConfig";

export interface WebviewApi<StateType> {
  postMessage: (message: unknown) => void;
  getState: () => StateType | undefined;
  setState: <T extends StateType | undefined>(newState: T) => T;
}

declare global {
  interface Window {
    EXTENSION_DEFAULT_CONFIG?: DefaultPageConfig;
    vsCodeWebviewAPI: WebviewApi;
  }
}

declare module NodeJS {
  interface Global {
    __getWebviewHtml__: (webview: Webview, context: ExtensionContext) => string;
    __getWebviewHtml__: (url: string) => string;
  }
}
