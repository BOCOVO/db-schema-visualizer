import type { JSONTableSchema, JSONTableTable } from "shared/types/tableSchema";

export const exampleData: JSONTableSchema = {
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
      fields: [
        {
          name: "id",
          type: { type_name: "integer", is_enum: false },
          pk: true,
          note: "a note",
          increment: true,
          not_null: true,
          is_relation: false,
          relational_tables: null,
        },
        {
          name: "view",
          type: { type_name: "integer", is_enum: false },
          note: "a note",
          dbdefault: { type: "number", value: 0 },
          is_relation: false,
          relational_tables: null,
        },
        {
          name: "following_user_id",
          type: { type_name: "integer", is_enum: false },
          note: "a note",
          is_relation: true,
          relational_tables: ["users"],
        },
        {
          name: "created_at",
          type: { type_name: "timestamp", is_enum: false },
          note: "a note",
          is_relation: false,
          relational_tables: null,
        },
        {
          name: "status",
          type: { type_name: "status", is_enum: true },
          note: "a note",
          is_relation: false,
          relational_tables: null,
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
          is_relation: true,
          relational_tables: ["follows"],
        },
        {
          name: "email",
          type: { type_name: "varchar", is_enum: false },
          unique: true,
          note: "a note",
          is_relation: false,
          relational_tables: null,
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
          is_relation: false,
          relational_tables: null,
        },
        {
          name: "country",
          type: { type_name: "varchar", is_enum: false },
          note: "a note",
          is_relation: false,
          relational_tables: null,
        },
        {
          name: "booking_date",
          type: { type_name: "date", is_enum: false },
          note: "a note",
          is_relation: false,
          relational_tables: null,
        },
      ],
      indexes: [
        {
          pk: true,
          columns: [
            { type: "column", value: "id" },
            { type: "column", value: "country" },
          ],
        },
        {
          name: "created_at_index",
          note: "a note",
          columns: [{ type: "column", value: "created_at" }],
        },
        {
          columns: [{ type: "column", value: "booking_date" }],
        },
        {
          unique: true,
          columns: [
            { type: "column", value: "country" },
            { type: "column", value: "booking_date" },
          ],
        },
        {
          type: "hash",
          columns: [{ type: "column", value: "booking_date" }],
        },
        {
          columns: [{ type: "expression", value: "id*2" }],
        },
        {
          columns: [
            { type: "expression", value: "id*3" },
            { type: "expression", value: "getdate()" },
          ],
        },
        {
          columns: [
            { type: "expression", value: "id*3" },
            { type: "column", value: "id" },
          ],
        },
      ],
    },
  ],
};

export const createBookingsTableClone = (key: string): JSONTableTable => {
  return {
    ...exampleData.tables[2],
    name: `bookings_${key}`,
  };
};
