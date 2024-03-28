import { ThemeContext } from "@/providers/ThemeProvider";
import { useContext } from "react";

import type { ThemeConfigValue } from "@/types/theme";

export const useTheme = (): ThemeConfigValue => {
  const theme = useContext(ThemeContext);
  if (theme === undefined) {
    throw new Error("it seem you forgot to wrap your app with ThemeProvider");
  }

  return theme;
};
