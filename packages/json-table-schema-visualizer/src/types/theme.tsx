export enum Theme {
  light = "light",
  dark = "dark",
}
export interface ThemeColors {
  text: {
    900: string;
    700: string;
  };
  connection: {
    default: string;
    active: string;
  };
  tableHeader: {
    bg: string;
    fg: string;
  };
  colAccent: string;
  table: {
    bg: string;
    shadow: string;
  };
  red: string;
  green: string;
  enumItem: string;
  white: string;
  noteBg: string;
  bg: string;
}

export interface ThemeProviderValue {
  themeColors: ThemeColors;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}
