import type { ThemeConfigValue } from "@/types/theme";

export const defaultThemeConfig: ThemeConfigValue = {
  text: {
    "900": "#636363",
    "700": "#9C9C9C",
  },
  connection: {
    active: "#1010ff",
    default: "#888",
  },
  colAccent: "aliceblue",
  table: {
    bg: "white",
    shadow: "black",
  },
  tableHeader: {
    bg: "#F8FAFC",
    fg: "black",
  },
};
