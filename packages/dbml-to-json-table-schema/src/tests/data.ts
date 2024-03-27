export const onlyTablesSchemaDBMLCode = `
  Table follows {
    id integer [primary key, not null, increment]
    following_user_id integer
    view integer [default: 0]
  }
`;

export const onlyTablesSchemaJSON = {
  refs: [],
  enums: [],
  tables: [
    {
      name: "follows",
      fields: [
        {
          name: "id",
          pk: true,
          increment: true,
          not_null: true,
          type: {
            type_name: "integer",
          },
        },
        {
          name: "following_user_id",
          type: {
            type_name: "integer",
          },
        },
        {
          name: "view",
          type: {
            type_name: "integer",
          },
          dbdefault: {
            type: "number",
            value: 0,
          },
        },
      ],
      indexes: [],
    },
  ],
};

export const withEnumDBMLCode = `
  Enum status {
    active
    inactive
  }

  Table follows {
    status status
  }
`;

export const withEnumJSON = {
  refs: [],
  enums: [
    {
      name: "status",
      values: [
        {
          name: "active",
        },
        {
          name: "inactive",
        },
      ],
    },
  ],
  tables: [
    {
      name: "follows",
      fields: [
        {
          name: "status",
          type: {
            type_name: "status",
          },
        },
      ],
      indexes: [],
    },
  ],
};

export const withRelationsAndUniquenessDBMLCode = `
  Table follows {
    following_user_id integer
    created_at timestamp 
  }

  Table users {
    id integer [primary key]
    email varchar [unique]
  }

  Ref: users.id < follows.following_user_id
`;

export const withRelationsAndUniquenessJSON = {
  refs: [
    {
      name: null,
      endpoints: [
        {
          relation: "1",
          tableName: "users",
          fieldNames: ["id"],
        },
        {
          relation: "*",
          tableName: "follows",
          fieldNames: ["following_user_id"],
        },
      ],
    },
  ],
  enums: [],
  tables: [
    {
      name: "follows",
      fields: [
        {
          name: "following_user_id",
          type: {
            type_name: "integer",
          },
        },
        {
          name: "created_at",
          type: {
            type_name: "timestamp",
          },
        },
      ],
      indexes: [],
    },
    {
      name: "users",
      fields: [
        {
          name: "id",
          type: {
            type_name: "integer",
          },
          pk: true,
        },
        {
          name: "email",
          type: {
            type_name: "varchar",
          },
          unique: true,
        },
      ],
      indexes: [],
    },
  ],
};

export const dbmlSchemaWithIndexes = `
  Table bookings {
    id integer
    country varchar
    booking_date date

    indexes {
        (id, country) [pk] // composite primary key
        created_at [name: 'created_at_index', note: 'Date']
        booking_date
        (country, booking_date) [unique]
        booking_date [type: hash]
        (\`id*2\`)
        (\`id*3\`,\`getdate()\`)
        (\`id*3\`,id)
    }
  }
`;

export const withIndexesJSON = {
  refs: [],
  enums: [],
  tables: [
    {
      name: "bookings",
      fields: [
        {
          name: "id",
          type: {
            type_name: "integer",
          },
        },
        {
          name: "country",
          type: {
            type_name: "varchar",
          },
        },
        {
          name: "booking_date",
          type: {
            type_name: "date",
          },
        },
      ],
      indexes: [
        {
          pk: true,
          columns: [
            {
              type: "column",
              value: "id",
            },
            {
              type: "column",
              value: "country",
            },
          ],
        },
        {
          name: "created_at_index",
          note: {
            value: "Date",
            token: {
              start: {
                offset: 190,
                line: 9,
                column: 47,
              },
              end: {
                offset: 202,
                line: 9,
                column: 59,
              },
            },
          },
          columns: [
            {
              type: "column",
              value: "created_at",
            },
          ],
        },
        {
          columns: [
            {
              type: "column",
              value: "booking_date",
            },
          ],
        },
        {
          unique: true,
          columns: [
            {
              type: "column",
              value: "country",
            },
            {
              type: "column",
              value: "booking_date",
            },
          ],
        },
        {
          type: "hash",
          columns: [
            {
              type: "column",
              value: "booking_date",
            },
          ],
        },
        {
          columns: [
            {
              type: "expression",
              value: "id*2",
            },
          ],
        },
        {
          columns: [
            {
              type: "expression",
              value: "id*3",
            },
            {
              type: "expression",
              value: "getdate()",
            },
          ],
        },
        {
          columns: [
            {
              type: "expression",
              value: "id*3",
            },
            {
              type: "column",
              value: "id",
            },
          ],
        },
      ],
    },
  ],
};
