import type { Enum, Field } from "@mrleebo/prisma-ast";

export const testSchema = `
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

model Product {
  id     String  @id @default(auto()) @map("_id") @db.ObjectId
  name   String  @unique
  price  Float
  colors Color[]
  sizes  Size[]
  photos Photo[]
  orders Order[]
}

model Order {
  id              String   @id @default(auto()) @map("_id") @db.ObjectId
  product         Product  @relation(fields: [productId], references: [id])
  color           Color
  size            Size
  shippingAddress Address
  billingAddress  Address?
  productId       String   @db.ObjectId
}

enum Color {
  Red
}

enum Size {
  Small
  Medium
  Large
  XLarge
}

type Photo {
  height Int    @default(200)
  width  Int    @default(100)
  url    String
}

type Address {
  street String
  city   String
  zip    String
}
`;

export const namedRelationTable1 = {
  type: "model",
  name: "Match",
  properties: [
    {
      type: "field",
      name: "id",
      fieldType: "String",
      array: false,
      optional: false,
      attributes: [
        {
          type: "attribute",
          name: "id",
          kind: "field",
        },
        {
          type: "attribute",
          name: "default",
          kind: "field",
          args: [
            {
              type: "attributeArgument",
              value: {
                type: "function",
                name: "cuid",
              },
            },
          ],
        },
        {
          type: "attribute",
          name: "map",
          kind: "field",
          args: [
            {
              type: "attributeArgument",
              value: '"_id"',
            },
          ],
        },
      ],
    },
    {
      type: "field",
      name: "name",
      fieldType: "String",
      array: false,
      optional: false,
    },
    {
      type: "field",
      name: "description",
      fieldType: "String",
      array: false,
      optional: false,
    },
    {
      type: "field",
      name: "player1",
      fieldType: "User",
      array: false,
      optional: false,
      attributes: [
        {
          type: "attribute",
          name: "map",
          kind: "field",
          args: [
            {
              type: "attributeArgument",
              value: '"_id"',
            },
          ],
        },
        {
          type: "attribute",
          name: "relation",
          kind: "field",
          args: [
            {
              type: "attributeArgument",
              value: {
                type: "keyValue",
                key: "fields",
                value: {
                  type: "array",
                  args: ["player1Id"],
                },
              },
            },
            {
              type: "attributeArgument",
              value: {
                type: "keyValue",
                key: "references",
                value: {
                  type: "array",
                  args: ["id"],
                },
              },
            },
            {
              type: "attributeArgument",
              value: {
                type: "keyValue",
                key: "name",
                value: '"player1"',
              },
            },
          ],
        },
      ],
    },
    {
      type: "field",
      name: "player1Id",
      fieldType: "String",
      array: false,
      optional: false,
    },
    {
      type: "field",
      name: "player2",
      fieldType: "User",
      array: false,
      optional: false,
      attributes: [
        {
          type: "attribute",
          name: "relation",
          kind: "field",
          args: [
            {
              type: "attributeArgument",
              value: {
                type: "keyValue",
                key: "fields",
                value: {
                  type: "array",
                  args: ["player2Id"],
                },
              },
            },
            {
              type: "attributeArgument",
              value: {
                type: "keyValue",
                key: "references",
                value: {
                  type: "array",
                  args: ["id"],
                },
              },
            },
            {
              type: "attributeArgument",
              value: '"player2"',
            },
          ],
        },
      ],
    },
    {
      type: "field",
      name: "player2Id",
      fieldType: "String",
      array: false,
      optional: false,
    },
    {
      type: "field",
      name: "createdAt",
      fieldType: "DateTime",
      array: false,
      optional: false,
      attributes: [
        {
          type: "attribute",
          name: "default",
          kind: "field",
          args: [
            {
              type: "attributeArgument",
              value: {
                type: "function",
                name: "now",
              },
            },
          ],
        },
      ],
    },
    {
      type: "field",
      name: "updatedAt",
      fieldType: "DateTime",
      array: false,
      optional: false,
      attributes: [
        {
          type: "attribute",
          name: "updatedAt",
          kind: "field",
        },
      ],
    },
    {
      type: "field",
      name: "leagueId",
      fieldType: "String",
      array: false,
      optional: false,
    },
  ],
};

export const namedRelationTable2 = {
  type: "model",
  name: "User",
  properties: [
    {
      type: "field",
      name: "id",
      fieldType: "String",
      array: false,
      optional: false,
      attributes: [
        {
          type: "attribute",
          name: "id",
          kind: "field",
        },
        {
          type: "attribute",
          name: "default",
          kind: "field",
          args: [
            {
              type: "attributeArgument",
              value: {
                type: "function",
                name: "uuid",
              },
            },
          ],
        },
        {
          type: "attribute",
          name: "map",
          kind: "field",
          args: [
            {
              type: "attributeArgument",
              value: '"_id"',
            },
          ],
        },
      ],
    },
    {
      type: "field",
      name: "email",
      fieldType: "String",
      array: false,
      optional: false,
      attributes: [
        {
          type: "attribute",
          name: "unique",
          kind: "field",
        },
      ],
    },
    {
      type: "field",
      name: "password",
      fieldType: "String",
      array: false,
      optional: false,
    },
    {
      type: "field",
      name: "createdAt",
      fieldType: "DateTime",
      array: false,
      optional: false,
      attributes: [
        {
          type: "attribute",
          name: "default",
          kind: "field",
          args: [
            {
              type: "attributeArgument",
              value: {
                type: "function",
                name: "now",
              },
            },
          ],
        },
      ],
    },
    {
      type: "field",
      name: "updatedAt",
      fieldType: "DateTime",
      array: false,
      optional: false,
      attributes: [
        {
          type: "attribute",
          name: "updatedAt",
          kind: "field",
        },
      ],
    },
    {
      type: "field",
      name: "player1Matches",
      fieldType: "Match",
      array: true,
      optional: false,
      attributes: [
        {
          type: "attribute",
          name: "relation",
          kind: "field",
          args: [
            {
              type: "attributeArgument",
              value: '"player1"',
            },
          ],
        },
      ],
    },
    {
      type: "field",
      name: "player2Matches",
      fieldType: "Match",
      array: true,
      optional: false,
      attributes: [
        {
          type: "attribute",
          name: "relation",
          kind: "field",
          args: [
            {
              type: "attributeArgument",
              value: '"player2"',
            },
          ],
        },
      ],
    },
  ],
};

export const namedRelationModel = [namedRelationTable1, namedRelationTable2];

export const colorEnum: Enum = {
  type: "enum",
  name: "Color",
  enumerators: [
    {
      type: "enumerator",
      name: "Red",
    },
    {
      type: "break",
    },
  ],
};

export const productRelation: Field = {
  type: "field",
  name: "product",
  fieldType: "Product",
  array: false,
  optional: false,
  attributes: [
    {
      type: "attribute",
      name: "relation",
      kind: "field",
      args: [
        {
          type: "attributeArgument",
          value: {
            type: "keyValue",
            key: "fields",
            value: {
              type: "array",
              args: ["productId"],
            },
          },
        },
        {
          type: "attributeArgument",
          value: {
            type: "keyValue",
            key: "references",
            value: {
              type: "array",
              args: ["id"],
            },
          },
        },
      ],
    },
  ],
};

export const productTable = {
  type: "model",
  name: "Product",
  properties: [
    {
      type: "field",
      name: "id",
      fieldType: "String",
      array: false,
      optional: false,
      attributes: [
        {
          type: "attribute",
          name: "id",
          kind: "field",
        },
        {
          type: "attribute",
          name: "default",
          kind: "field",
          args: [
            {
              type: "attributeArgument",
              value: {
                type: "function",
                name: "auto",
              },
            },
          ],
        },
        {
          type: "attribute",
          name: "map",
          kind: "field",
          args: [
            {
              type: "attributeArgument",
              value: '"_id"',
            },
          ],
        },
        {
          type: "attribute",
          name: "ObjectId",
          kind: "field",
          group: "db",
        },
      ],
    },
    {
      type: "field",
      name: "name",
      fieldType: "String",
      array: false,
      optional: false,
      attributes: [
        {
          type: "attribute",
          name: "unique",
          kind: "field",
        },
      ],
    },
    {
      type: "field",
      name: "price",
      fieldType: "Float",
      array: false,
      optional: false,
    },
    {
      type: "field",
      name: "colors",
      fieldType: "Color",
      array: true,
      optional: false,
    },
    {
      type: "field",
      name: "sizes",
      fieldType: "Size",
      array: true,
      optional: false,
    },
    {
      type: "field",
      name: "photos",
      fieldType: "Photo",
      array: true,
      optional: false,
    },
    {
      type: "field",
      name: "orders",
      fieldType: "Order",
      array: true,
      optional: false,
    },
  ],
};

export const testSchemaAST = {
  type: "schema",
  list: [
    {
      type: "generator",
      name: "client",
      assignments: [
        {
          type: "assignment",
          key: "provider",
          value: '"prisma-client-js"',
        },
      ],
    },
    {
      type: "break",
    },
    {
      type: "datasource",
      name: "db",
      assignments: [
        {
          type: "assignment",
          key: "provider",
          value: '"mongodb"',
        },
        {
          type: "assignment",
          key: "url",
          value: {
            type: "function",
            name: "env",
            params: ['"DATABASE_URL"'],
          },
        },
      ],
    },
    {
      type: "break",
    },
    productTable,
    {
      type: "break",
    },
    {
      type: "model",
      name: "Order",
      properties: [
        {
          type: "field",
          name: "id",
          fieldType: "String",
          array: false,
          optional: false,
          attributes: [
            {
              type: "attribute",
              name: "id",
              kind: "field",
            },
            {
              type: "attribute",
              name: "default",
              kind: "field",
              args: [
                {
                  type: "attributeArgument",
                  value: {
                    type: "function",
                    name: "auto",
                  },
                },
              ],
            },
            {
              type: "attribute",
              name: "map",
              kind: "field",
              args: [
                {
                  type: "attributeArgument",
                  value: '"_id"',
                },
              ],
            },
            {
              type: "attribute",
              name: "ObjectId",
              kind: "field",
              group: "db",
            },
          ],
        },
        productRelation,
        {
          type: "field",
          name: "color",
          fieldType: "Color",
          array: false,
          optional: false,
        },
        {
          type: "field",
          name: "size",
          fieldType: "Size",
          array: false,
          optional: false,
        },
        {
          type: "field",
          name: "shippingAddress",
          fieldType: "Address",
          array: false,
          optional: false,
        },
        {
          type: "field",
          name: "billingAddress",
          fieldType: "Address",
          array: false,
          optional: true,
        },
        {
          type: "field",
          name: "productId",
          fieldType: "String",
          array: false,
          optional: false,
          attributes: [
            {
              type: "attribute",
              name: "ObjectId",
              kind: "field",
              group: "db",
            },
          ],
        },
      ],
    },
    {
      type: "break",
    },
    colorEnum,
    {
      type: "break",
    },
    {
      type: "enum",
      name: "Size",
      enumerators: [
        {
          type: "enumerator",
          name: "Small",
        },
        {
          type: "enumerator",
          name: "Medium",
        },
        {
          type: "enumerator",
          name: "Large",
        },
        {
          type: "enumerator",
          name: "XLarge",
        },
      ],
    },
    {
      type: "break",
    },
    {
      type: "type",
      name: "Photo",
      properties: [
        {
          type: "field",
          name: "height",
          fieldType: "Int",
          array: false,
          optional: false,
          attributes: [
            {
              type: "attribute",
              name: "default",
              kind: "field",
              args: [
                {
                  type: "attributeArgument",
                  value: "200",
                },
              ],
            },
          ],
        },
        {
          type: "field",
          name: "width",
          fieldType: "Int",
          array: false,
          optional: false,
          attributes: [
            {
              type: "attribute",
              name: "default",
              kind: "field",
              args: [
                {
                  type: "attributeArgument",
                  value: "100",
                },
              ],
            },
          ],
        },
        {
          type: "field",
          name: "url",
          fieldType: "String",
          array: false,
          optional: false,
        },
      ],
    },
    {
      type: "break",
    },
    {
      type: "type",
      name: "Address",
      properties: [
        {
          type: "field",
          name: "street",
          fieldType: "String",
          array: false,
          optional: false,
        },
        {
          type: "field",
          name: "city",
          fieldType: "String",
          array: false,
          optional: false,
        },
        {
          type: "field",
          name: "zip",
          fieldType: "String",
          array: false,
          optional: false,
        },
      ],
    },
  ],
};
