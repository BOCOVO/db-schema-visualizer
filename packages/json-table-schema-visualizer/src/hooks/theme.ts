import { useContext, useState } from "react";

import {
  Theme,
  type ThemeColors,
  type ThemeProviderValue,
} from "@/types/theme";
import { ThemeContext } from "@/providers/ThemeProvider";
import { darkThemeConfig, defaultThemeConfig } from "@/constants/theme";

export const useThemeContext = (): ThemeProviderValue => {
  const contextValue = useContext(ThemeContext);
  if (contextValue === undefined) {
    throw new Error("it seem you forgot to wrap your app with ThemeProvider");
  }

  return contextValue;
};

export const useThemeColors = (): ThemeColors => {
  const contextValue = useThemeContext();

  return contextValue.themeColors;
};

export const useCreateTheme = (
  defaultTheme: Theme = Theme.dark,
): ThemeProviderValue => {
  const [theme, setTheme] = useState(defaultTheme);

  const themeColors =
    theme === Theme.dark ? darkThemeConfig : defaultThemeConfig;

  return { setTheme, theme, themeColors };
};
