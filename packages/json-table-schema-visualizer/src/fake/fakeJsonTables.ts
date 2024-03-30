export const exampleData = {
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
