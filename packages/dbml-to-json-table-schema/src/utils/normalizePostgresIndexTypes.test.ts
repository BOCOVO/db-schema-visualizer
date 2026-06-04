import { normalizePostgresIndexTypesForDBMLParser } from "./normalizePostgresIndexTypes";

describe("normalize postgres index types for dbml parser", () => {
  test("normalizes unsupported postgres index types for the DBML parser", () => {
    const result = normalizePostgresIndexTypesForDBMLParser(`
      Table parcel {
        geom_lv95 geometry

        indexes {
          geom_lv95 [type: GiST]
          (geom_lv95) [name: 'geom_idx', type: gin]
        }
      }
    `);

    expect(result.dbmlCode).toContain("geom_lv95 [type: hash");
    expect(result.dbmlCode).toContain(
      "(geom_lv95) [name: 'geom_idx', type: hash",
    );
  });

  test("does not normalize text outside index blocks", () => {
    const dbmlCode = `
      Table parcel {
        id integer [note: '[type: gist]']
        geom_lv95 geometry

        indexes {
          geom_lv95 [type: gist]
        }
      }
    `;

    const result = normalizePostgresIndexTypesForDBMLParser(dbmlCode);

    expect(result.dbmlCode).toContain("id integer [note: '[type: gist]']");
    expect(result.dbmlCode).toContain("geom_lv95 [type: hash");
  });

  test("restores normalized types by parsed index order", () => {
    const result = normalizePostgresIndexTypesForDBMLParser(`
      Table parcel {
        code varchar
        geom_lv95 geometry

        indexes {
          code [type: hash]
          geom_lv95 [type: gist]
        }
      }

      Table boundary {
        geom geometry

        indexes {
          geom [type: brin]
        }
      }
    `);

    const rawParsedSchema = {
      tables: [
        {
          indexes: [{ type: "hash" }, { type: "hash" }],
        },
        {
          indexes: [{ type: "hash" }],
        },
      ],
    };

    result.restoreIndexTypes(rawParsedSchema);

    expect(rawParsedSchema.tables.map((table) => table.indexes)).toEqual([
      [{ type: "hash" }, { type: "gist" }],
      [{ type: "brin" }],
    ]);
  });
});
