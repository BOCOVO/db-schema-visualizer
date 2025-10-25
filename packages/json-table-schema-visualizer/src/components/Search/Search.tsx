import { useState, useMemo, useRef, useEffect } from "react";
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
  const { setHoveredTableName } = useTablesInfo();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const searchResults = useMemo(() => {
    if (search === "") return [];

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
    setHoveredTableName(result.tableName);
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

  return (
    <div className="fixed top-4 right-4 z-50" ref={dropdownRef}>
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setIsOpen(true);
          }}
          placeholder="Search tables and columns..."
          className="w-64 px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />

        {isOpen && searchResults.length > 0 && (
          <div className="absolute top-full mt-1 w-full bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 max-h-60 overflow-y-auto">
            {searchResults.map((result, index) => (
              <button
                key={`${result.type}-${result.tableName}-${result.name}-${index}`}
                onClick={() => {
                  handleSelect(result);
                }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-600 flex flex-col items-start"
              >
                <div className="flex space-x-2 w-full items-start">
                  <span className="text-xs mt-[2px]">
                    {result.type === "table" ? "📋" : "🔤"}
                  </span>
                  <span className="font-medium break-all text-gray-700">
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
