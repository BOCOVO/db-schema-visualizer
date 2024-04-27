export enum WebviewCommand {
  SET_THEME_PREFERENCES = "SET_THEME_PREFERENCES",
}

export interface WebviewPostMessage {
  command: WebviewCommand;
  message: string;
}
