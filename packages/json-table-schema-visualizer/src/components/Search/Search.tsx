import {
  useState,
  useMemo,
  useRef,
  useEffect,
  type KeyboardEvent,
} from "react";
import { type JSONTableTable } from "shared/types/tableSchema";

import eventEmitter from "@/events-emitter";
import { useTablesInfo } from "@/hooks/table";

interface SearchResult {
  type: "table" | "column";
  tableName: string;
  name: string;
}

interface SearchProps {
  tables: JSONTableTable[];
}

/**
 * This is the search bar component placed on the top-right corner
 * of the stage, where you can search table or column.
 */
const Search = ({ tables }: SearchProps) => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { setHoveredTableName, setHighlightedColumns } = useTablesInfo();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const searchResults = useMemo(() => {
    if (search.length < 2) return [];

    const results: SearchResult[] = [];
    const searchLower = search.toLowerCase();

    tables.forEach((table) => {
      // Search in table names
      if (table.name.toLowerCase().includes(searchLower)) {
        results.push({
          type: "table",
          tableName: table.name,
          name: table.name,
        });
      }

      // Search in column names
      table.fields.forEach((field) => {
        if (field.name.toLowerCase().includes(searchLower)) {
          results.push({
            type: "column",
            tableName: table.name,
            name: field.name,
          });
        }
      });
    });

    return results;
  }, [tables, search]);

  const handleSelect = (result: SearchResult) => {
    setHoveredTableName(null);
    if (result.type === "column") {
      setHighlightedColumns([`${result.tableName}.${result.name}`]);
    } else {
      setHighlightedColumns([]);
    }
    // Center the diagram on the selected table and ask the table to highlight itself
    eventEmitter.emit("table:center", { tableName: result.tableName });
    eventEmitter.emit(`highlight:table:${result.tableName}`);

    setIsOpen(false);
    setSearch("");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current != null &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleShortcut = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "f") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleShortcut);
    return () => {
      window.removeEventListener("keydown", handleShortcut);
    };
  }, []);

  const handleOnEnterClick = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (searchResults.length > 0) {
        handleSelect(searchResults[0]);
        setIsOpen(false);
      }
    }
    if (e.key === "ArrowDown") {
      const firstButton = dropdownRef.current?.querySelector("button");
      firstButton?.focus();
    }
  };

  const handleOptionClick = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      (e.currentTarget.nextElementSibling as HTMLElement | null)?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      (e.currentTarget.previousElementSibling as HTMLElement | null)?.focus();
    } else if (e.key === "Enter") {
      e.preventDefault();
      e.currentTarget.click();
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50" ref={dropdownRef}>
      <div className="relative">
        <div
          title="Use ⌘+F or control+F command to search"
          className="relative flex items-center"
        >
          <input
            type="text"
            value={search}
            onKeyDown={handleOnEnterClick}
            ref={inputRef}
            onChange={(e) => {
              setSearch(e.target.value);
              setIsOpen(true);
            }}
            placeholder="Search tables and columns..."
            className="w-72 px-4 py-3 focus:outline-none text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          <span className="absolute right-2 px-2 py-1 rounded-lg bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            ⌘F
          </span>
        </div>

        {isOpen && searchResults.length > 0 && (
          <div className="absolute top-full mt-1 w-full bg-white dark:bg-gray-700 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600 max-h-60 overflow-y-auto">
            {searchResults.map((result, index) => (
              <button
                tabIndex={-index}
                key={`${result.type}-${result.tableName}-${result.name}-${index}`}
                onClick={() => {
                  handleSelect(result);
                }}
                onKeyDown={handleOptionClick}
                className="w-full px-4 py-2 text-left text-sm focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-600 focus:bg-gray-100 dark:focus:bg-gray-600 flex flex-col items-start"
              >
                <div className="flex space-x-2 w-full items-start">
                  <span className="text-xs mt-[3px]">
                    {result.type === "table" ? "📋" : "🔤"}
                  </span>
                  <span className="font-medium break-all text-gray-700 dark:text-gray-200">
                    {result.name}
                  </span>
                </div>
                {result.type === "column" && (
                  <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 break-all">
                    in {result.tableName}
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
