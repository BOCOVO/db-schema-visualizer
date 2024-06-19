import { Parser } from "@dbml/core";

export const dbmlTestCode = `
  Enum status {
    active [note: "a note"]
    inactive [note: "a note"]
  }

  Table follows [headercolor: #3498DB] {
    id integer [primary key, not null, increment, note: "a note"]
    view integer [default: 0, note: "a note"]
    following_user_id integer [note: "a note"]
    created_at timestamp [note: "a note"]
    status status [note: "a note"]

    Note: 'a note'
  }

  Table users {
    id integer [primary key, note: "a note"]
    email varchar [unique, note: "a note"]

    Note: 'a note'
  }

  Table bookings {
    id integer [note: "a note"]
    country varchar [note: "a note"]
    booking_date date [note: "a note"]

    Note: 'a note'

    indexes {
        (id, country) [pk] // composite primary key
        created_at [name: 'created_at_index', note: 'a note']
        booking_date
        (country, booking_date) [unique]
        booking_date [type: hash]
        (\`id*2\`)
        (\`id*3\`,\`getdate()\`)
        (\`id*3\`,id)
    }
  }

  Ref: users.id < follows.following_user_id
`;

export const dbmlTestCodeInJSONTableFormat = {
  refs: [
    {
      name: null,
      endpoints: [
        { relation: "1", tableName: "users", fieldNames: ["id"] },
        {
          relation: "*",
          tableName: "follows",
          fieldNames: ["following_user_id"],
        },
      ],
    },
  ],
  enums: [
    {
      name: "status",
      values: [
        {
          name: "active",
          note: "a note",
        },
        {
          name: "inactive",
          note: "a note",
        },
      ],
    },
  ],
  tables: [
    {
      name: "follows",
      note: "a note",
      headerColor: "#3498DB",
      fields: [
        {
          name: "id",
          type: { type_name: "integer", is_enum: false },
          pk: true,
          note: "a note",
          increment: true,
          not_null: true,
          is_relation: false,
          dbdefault: undefined,
          unique: undefined,
          relational_tables: null,
        },
        {
          name: "view",
          type: { type_name: "integer", is_enum: false },
          note: "a note",
          dbdefault: { type: "number", value: 0 },
          is_relation: false,
          unique: undefined,
          relational_tables: null,
          increment: undefined,
          pk: undefined,
          not_null: undefined,
        },
        {
          name: "following_user_id",
          type: { type_name: "integer", is_enum: false },
          note: "a note",
          dbdefault: undefined,
          is_relation: true,
          unique: undefined,
          relational_tables: new Set(["users"]),
          increment: undefined,
          not_null: undefined,
          pk: undefined,
        },
        {
          name: "created_at",
          type: { type_name: "timestamp", is_enum: false },
          note: "a note",
          dbdefault: undefined,
          is_relation: false,
          relational_tables: null,
          increment: undefined,
          pk: undefined,
          not_null: undefined,
          unique: undefined,
        },
        {
          name: "status",
          type: { type_name: "status", is_enum: true },
          note: "a note",
          dbdefault: undefined,
          pk: undefined,
          is_relation: false,
          unique: undefined,
          relational_tables: null,
          increment: undefined,
          not_null: undefined,
        },
      ],
      indexes: [],
    },
    {
      name: "users",
      note: "a note",
      fields: [
        {
          name: "id",
          type: { type_name: "integer", is_enum: false },
          pk: true,
          note: "a note",
          dbdefault: undefined,
          is_relation: true,
          unique: undefined,
          relational_tables: new Set(["follows"]),
          increment: undefined,
          not_null: undefined,
        },
        {
          name: "email",
          type: { type_name: "varchar", is_enum: false },
          unique: true,
          note: "a note",
          dbdefault: undefined,
          pk: undefined,
          is_relation: false,
          relational_tables: null,
          increment: undefined,
          not_null: undefined,
        },
      ],
      indexes: [],
    },
    {
      name: "bookings",
      note: "a note",
      fields: [
        {
          name: "id",
          type: { type_name: "integer", is_enum: false },
          note: "a note",
          dbdefault: undefined,
          pk: undefined,
          is_relation: false,
          unique: undefined,
          relational_tables: null,
          increment: undefined,
          not_null: undefined,
        },
        {
          name: "country",
          type: { type_name: "varchar", is_enum: false },
          note: "a note",
          dbdefault: undefined,
          pk: undefined,
          is_relation: false,
          unique: undefined,
          relational_tables: null,
          increment: undefined,
          not_null: undefined,
        },
        {
          name: "booking_date",
          type: { type_name: "date", is_enum: false },
          note: "a note",
          dbdefault: undefined,
          pk: undefined,
          is_relation: false,
          unique: undefined,
          relational_tables: null,
          increment: undefined,
          not_null: undefined,
        },
      ],
      indexes: [
        {
          pk: true,
          columns: [
            { type: "column", value: "id" },
            { type: "column", value: "country" },
          ],
          name: undefined,
          note: undefined,
          type: undefined,
          unique: undefined,
        },
        {
          name: "created_at_index",
          note: "a note",
          columns: [{ type: "column", value: "created_at" }],
          pk: undefined,
          type: undefined,
          unique: undefined,
        },
        {
          name: undefined,
          note: undefined,
          pk: undefined,
          type: undefined,
          unique: undefined,
          columns: [{ type: "column", value: "booking_date" }],
        },
        {
          unique: true,
          columns: [
            { type: "column", value: "country" },
            { type: "column", value: "booking_date" },
          ],
          name: undefined,
          note: undefined,
          pk: undefined,
          type: undefined,
        },
        {
          name: undefined,
          note: undefined,
          pk: undefined,
          type: "hash",
          unique: undefined,
          columns: [{ type: "column", value: "booking_date" }],
        },
        {
          name: undefined,
          note: undefined,
          pk: undefined,
          type: undefined,
          unique: undefined,
          columns: [{ type: "expression", value: "id*2" }],
        },
        {
          name: undefined,
          note: undefined,
          pk: undefined,
          type: undefined,
          unique: undefined,
          columns: [
            { type: "expression", value: "id*3" },
            { type: "expression", value: "getdate()" },
          ],
        },
        {
          name: undefined,
          note: undefined,
          pk: undefined,
          type: undefined,
          unique: undefined,
          columns: [
            { type: "expression", value: "id*3" },
            { type: "column", value: "id" },
          ],
        },
      ],
    },
  ],
};

export const parsedDBML = Parser.parseDBMLToJSON(dbmlTestCode);
