import { defaultThemeConfig } from "@/constants/theme";
import type { ThemeConfigValue } from "@/types/theme";
import { createContext, type PropsWithChildren } from "react";

export const ThemeContext = createContext<ThemeConfigValue>(defaultThemeConfig);

interface ThemeProviderProps extends PropsWithChildren {
  theme: ThemeConfigValue;
}

const ThemeProvider = ({ theme, children }: ThemeProviderProps) => {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
