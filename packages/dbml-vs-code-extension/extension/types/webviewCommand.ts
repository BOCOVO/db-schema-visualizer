import { JSONTableSchema, JSONTableTable } from "shared/types/tableSchema";

export enum WebviewCommand {
  SET_THEME_PREFERENCES = "SET_THEME_PREFERENCES",
}

export interface WebviewPostMessage {
  command: WebviewCommand;
  message: string;
}

export interface SetSchemaCommandPayload {
  type: string;
  payload: JSONTableSchema;
  key: string;
}
