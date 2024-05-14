import { Moon, Sun } from "lucide-react";

import ToolbarButton from "../Button";

import { Theme } from "@/types/theme";
import { useThemeContext } from "@/hooks/theme";

const ThemeToggler = () => {
  const { setTheme, theme } = useThemeContext();

  const handleThemeToggle = () => {
    setTheme(Theme.light === theme ? Theme.dark : Theme.light);
  };

  return (
    <ToolbarButton
      onClick={handleThemeToggle}
      aria-label="Change theme mode"
      title="Change theme mode"
    >
      <div className="cursor-pointer">
        <Sun className="dark:hidden" />

        <Moon className="hidden dark:block " />
      </div>
    </ToolbarButton>
  );
};

export default ThemeToggler;
