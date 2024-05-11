import { useEffect, useState } from "react";
import { JSONTableSchema } from "shared/types/tableSchema";
import { tableCoordsStore } from "json-table-schema-visualizer/src/stores/tableCoords";
export const useSchema = () => {
  const [schema, setSchema] = useState<JSONTableSchema | null>(null);
  const [schemaKey, setSchemaKey] = useState<string | null>(null);

  useEffect(() => {
    const updater = (e: MessageEvent) => {
      const message = e.data;
      if (
        !(message.type === "setSchema" && typeof message.payload === "object")
      ) {
        return;
      }

      if (message.key) {
        // update stores
        tableCoordsStore.switchTo(message.key);

        setSchemaKey(message.key);
      }

      setSchema(message.payload);
    };

    window.addEventListener("message", updater);

    return () => {
      window.removeEventListener("message", updater);
    };
  }, []);

  return { schema, key: schemaKey };
};
