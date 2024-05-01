import { Theme } from "json-table-schema-visualizer/src/types/theme";
import { workspace, WorkspaceConfiguration } from "vscode";
import { ConfigKeys } from "@/extension/types/configKeys";
import { DefaultPageConfig } from "@/extension/types/defaultPageConfig";

export class ExtensionConfig {
  private config: WorkspaceConfiguration;

  constructor(configSession: string) {
    const extensionConfigs = workspace.getConfiguration(configSession);
    this.config = extensionConfigs;
  }

  setTheme(theme: Theme) {
    this.config.update(ConfigKeys.preferredTheme, theme);
  }

  getPreferredTheme() {
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
