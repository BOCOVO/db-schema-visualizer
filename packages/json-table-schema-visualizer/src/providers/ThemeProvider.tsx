import { createContext, type PropsWithChildren } from "react";

import {
  type ThemeColors,
  type ThemeProviderValue,
  Theme,
} from "@/types/theme";
import { darkThemeConfig } from "@/constants/theme";

export const ThemeContext = createContext<ThemeProviderValue>({
  themeColors: darkThemeConfig,
  theme: Theme.dark,
  setTheme: () => {},
});

interface ThemeProviderProps extends PropsWithChildren {
  theme: Theme;
  themeColors: ThemeColors;
  setTheme: (value: Theme) => void;
}

const ThemeProvider = ({
  theme,
  themeColors,
  setTheme,
  children,
}: ThemeProviderProps) => {
  return (
    <ThemeContext.Provider value={{ setTheme, theme, themeColors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
