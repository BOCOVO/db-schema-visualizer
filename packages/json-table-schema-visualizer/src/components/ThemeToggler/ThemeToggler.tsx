import { Moon, Sun } from "lucide-react";

import { Theme } from "@/types/theme";
import { useThemeContext } from "@/hooks/theme";

const ThemeToggler = () => {
  const { setTheme, theme } = useThemeContext();

  const handleThemeToggle = () => {
    setTheme(Theme.light === theme ? Theme.dark : Theme.light);
  };

  return (
    <button
      onClick={handleThemeToggle}
      aria-label="Change theme mode"
      title="Change theme mode"
      className="w-10 p-2 border rounded-lg shadow-lg dark:border-gray-300 active:scale-95 group hover:bg-gray-100 dark:hover:bg-gray-900 bg-gray-50 dark:bg-black"
    >
      <div className="cursor-pointer">
        <Sun className="text-gray-600 dark:hidden group-hover:text-black dark:text-gray-300 group-hover:dark:text-white" />

        <Moon className="hidden text-gray-600 dark:block group-hover:text-black dark:text-gray-300 group-hover:dark:text-white" />
      </div>
    </button>
  );
};

export default ThemeToggler;
