import type { ThemeColors } from "@/types/theme";

export const defaultThemeConfig: ThemeColors = {
  text: {
    "900": "#636363",
    "700": "#9C9C9C",
  },
  connection: {
    active: "#029CFD",
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
  red: "red",
  green: "#00FF00",
  enumItem: "#ccc",
  white: "white",
  noteBg: "#000000d6",
  bg: "white",
};

export const darkThemeConfig: ThemeColors = {
  text: {
    "900": "#E6E6E6",
    "700": "#B3B3B3",
  },
  connection: {
    active: "#00BFFF",
    default: "#888888",
  },
  colAccent: "#333333",
  table: {
    bg: "#2F2F2F",
    shadow: "rgba(255, 255, 255, 0.1)",
  },
  tableHeader: {
    bg: "#1E1E1E",
    fg: "#CCCCCC",
  },
  red: "#FF6347",
  green: "#32CD32",
  enumItem: "#999999",
  white: "#FFFFFF",
  noteBg: "#3F3F3F",
  bg: "#1A1A1A",
};
