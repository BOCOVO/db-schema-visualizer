import { parseDBMLToJSON } from ".";

describe("parse DBML to JSON", () => {
  test("parses PostGIS gist indexes", () => {
    const schema = parseDBMLToJSON(`
      Table parcel {
        id integer [primary key]
        geom_lv95 geometry

        indexes {
          geom_lv95 [type: gist]
        }
      }
    `);

    expect(schema.tables[0].indexes[0]).toEqual({
      columns: [{ type: "column", value: "geom_lv95" }],
      name: undefined,
      note: undefined,
      pk: false,
      type: "gist",
      unique: undefined,
    });
  });

  test("keeps existing hash indexes when restoring unsupported index types", () => {
    const schema = parseDBMLToJSON(`
      Table parcel {
        id integer [primary key]
        code varchar
        geom_lv95 geometry

        indexes {
          code [type: hash]
          geom_lv95 [type: gist]
        }
      }
    `);

    expect(schema.tables[0].indexes.map((index) => index.type)).toEqual([
      "hash",
      "gist",
    ]);
  });
});
