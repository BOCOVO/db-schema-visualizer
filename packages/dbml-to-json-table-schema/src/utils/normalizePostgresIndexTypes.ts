const DBML_SUPPORTED_INDEX_TYPE = "hash";
const POSTGRES_INDEX_TYPES = new Set(["brin", "gin", "gist", "spgist"]);
const INDEX_TYPE_SETTING_REGEX =
  /(\[\s*|,\s*)type\s*:\s*([A-Za-z][A-Za-z0-9_]*)\b/;

interface UnsupportedIndexTypeReplacement {
  indexNumber: number;
  type: string;
}

interface IndexBlockRange {
  content: string;
  contentEndIndex: number;
  contentStartIndex: number;
}

interface DBMLIndex {
  type?: string;
}

interface DBMLTableWithIndexes {
  indexes: DBMLIndex[];
}

interface DBMLSchemaWithIndexes {
  tables: DBMLTableWithIndexes[];
}

interface NormalizedDBMLForParser {
  dbmlCode: string;
  restoreIndexTypes: (rawParsedSchema: DBMLSchemaWithIndexes) => void;
}

const stripDBMLComments = (value: string): string =>
  value.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");

const findClosingBraceIndex = (
  value: string,
  openingBraceIndex: number,
): number => {
  let depth = 0;
  let quote: string | null = null;

  for (let index = openingBraceIndex; index < value.length; index += 1) {
    const char = value[index];
    const previousChar = value[index - 1];

    if (quote !== null) {
      if (char === quote && previousChar !== "\\") {
        quote = null;
      }
      continue;
    }

    if (char === "'" || char === '"' || char === "`") {
      quote = char;
      continue;
    }

    if (char === "{") {
      depth += 1;
      continue;
    }

    if (char === "}") {
      depth -= 1;

      if (depth === 0) {
        return index;
      }
    }
  }

  return -1;
};

const getIndexBlockRanges = (dbmlCode: string): IndexBlockRange[] => {
  const indexBlockRanges: IndexBlockRange[] = [];
  const indexesBlockRegex = /\bindexes\s*\{/g;
  let match: RegExpExecArray | null;

  while ((match = indexesBlockRegex.exec(dbmlCode)) !== null) {
    const openingBraceIndex = dbmlCode.indexOf("{", match.index);
    const closingBraceIndex = findClosingBraceIndex(
      dbmlCode,
      openingBraceIndex,
    );

    if (closingBraceIndex === -1) {
      continue;
    }

    indexBlockRanges.push({
      content: dbmlCode.slice(openingBraceIndex + 1, closingBraceIndex),
      contentEndIndex: closingBraceIndex,
      contentStartIndex: openingBraceIndex + 1,
    });
    indexesBlockRegex.lastIndex = closingBraceIndex + 1;
  }

  return indexBlockRanges;
};

const splitIndexBlockEntries = (indexBlockContent: string): string[] => {
  const entries: string[] = [];
  let entryStartIndex = 0;
  let bracketDepth = 0;
  let parenthesisDepth = 0;
  let quote: string | null = null;

  for (let index = 0; index < indexBlockContent.length; index += 1) {
    const char = indexBlockContent[index];
    const previousChar = indexBlockContent[index - 1];

    if (quote !== null) {
      if (char === quote && previousChar !== "\\") {
        quote = null;
      }
      continue;
    }

    if (char === "'" || char === '"' || char === "`") {
      quote = char;
      continue;
    }

    if (char === "[") {
      bracketDepth += 1;
      continue;
    }

    if (char === "]") {
      bracketDepth -= 1;
      continue;
    }

    if (char === "(") {
      parenthesisDepth += 1;
      continue;
    }

    if (char === ")") {
      parenthesisDepth -= 1;
      continue;
    }

    if (char === "\n" && bracketDepth === 0 && parenthesisDepth === 0) {
      entries.push(indexBlockContent.slice(entryStartIndex, index));
      entryStartIndex = index + 1;
    }
  }

  entries.push(indexBlockContent.slice(entryStartIndex));

  return entries.filter((entry) => stripDBMLComments(entry).trim() !== "");
};

const collectUnsupportedIndexTypeReplacements = (
  dbmlCode: string,
): UnsupportedIndexTypeReplacement[] => {
  const replacements: UnsupportedIndexTypeReplacement[] = [];
  let indexNumber = 0;

  for (const { content: indexBlockContent } of getIndexBlockRanges(dbmlCode)) {
    for (const entry of splitIndexBlockEntries(indexBlockContent)) {
      const indexType = stripDBMLComments(entry).match(
        INDEX_TYPE_SETTING_REGEX,
      )?.[2];
      const normalizedIndexType = indexType?.toLowerCase();

      if (
        normalizedIndexType !== undefined &&
        POSTGRES_INDEX_TYPES.has(normalizedIndexType)
      ) {
        replacements.push({
          indexNumber,
          type: normalizedIndexType,
        });
      }

      indexNumber += 1;
    }
  }

  return replacements;
};

const normalizeUnsupportedIndexTypesForDBMLParser = (
  dbmlCode: string,
): string => {
  const indexBlockRanges = getIndexBlockRanges(dbmlCode);

  if (indexBlockRanges.length === 0) {
    return dbmlCode;
  }

  let normalizedDBMLCode = "";
  let previousIndex = 0;

  for (const indexBlockRange of indexBlockRanges) {
    normalizedDBMLCode += dbmlCode.slice(
      previousIndex,
      indexBlockRange.contentStartIndex,
    );
    normalizedDBMLCode += indexBlockRange.content.replace(
      /(\[\s*|,\s*)type\s*:\s*(brin|gin|gist|spgist)\b/gi,
      (match: string, settingPrefix: string) => {
        const replacement = `${settingPrefix}type: ${DBML_SUPPORTED_INDEX_TYPE}`;
        return `${replacement}${" ".repeat(
          Math.max(0, match.length - replacement.length),
        )}`;
      },
    );
    previousIndex = indexBlockRange.contentEndIndex;
  }

  return `${normalizedDBMLCode}${dbmlCode.slice(previousIndex)}`;
};

const restoreUnsupportedIndexTypes = (
  rawParsedSchema: DBMLSchemaWithIndexes,
  replacements: UnsupportedIndexTypeReplacement[],
): void => {
  if (replacements.length === 0) {
    return;
  }

  const replacementsByIndexNumber = new Map(
    replacements.map((replacement) => [
      replacement.indexNumber,
      replacement.type,
    ]),
  );
  let indexNumber = 0;

  for (const table of rawParsedSchema.tables) {
    for (const index of table.indexes) {
      const replacement = replacementsByIndexNumber.get(indexNumber);

      if (replacement !== undefined) {
        index.type = replacement;
      }

      indexNumber += 1;
    }
  }
};

export const normalizePostgresIndexTypesForDBMLParser = (
  dbmlCode: string,
): NormalizedDBMLForParser => {
  const unsupportedIndexTypeReplacements =
    collectUnsupportedIndexTypeReplacements(dbmlCode);

  return {
    dbmlCode: normalizeUnsupportedIndexTypesForDBMLParser(dbmlCode),
    restoreIndexTypes: (rawParsedSchema) => {
      restoreUnsupportedIndexTypes(
        rawParsedSchema,
        unsupportedIndexTypeReplacements,
      );
    },
  };
};
