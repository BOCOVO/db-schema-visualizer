import { Theme } from "json-table-schema-visualizer/src/types/theme";
import { workspace, type WorkspaceConfiguration } from "vscode";

import { ConfigKeys } from "../types/configKeys";
import { type DefaultPageConfig } from "../types/defaultPageConfig";

export class ExtensionConfig {
  private readonly config: WorkspaceConfiguration;

  constructor(configSession: string) {
    const extensionConfigs = workspace.getConfiguration(configSession);
    this.config = extensionConfigs;
  }

  async setTheme(theme: Theme): Promise<void> {
    try {
      await this.config.update(ConfigKeys.preferredTheme, theme);
    } catch (error) {
      console.error("Failed to set theme preference", error);
    }
  }

  getPreferredTheme(): Theme {
    const preferredTheme = this.config.get(ConfigKeys.preferredTheme);
    if (Theme.light === preferredTheme) {
      return preferredTheme;
    }

    return Theme.dark;
  }

  getDefaultPageConfig(): DefaultPageConfig {
    const theme = this.getPreferredTheme();

    return { theme };
  }
}
