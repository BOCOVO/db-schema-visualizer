import Table from "./Table";

import type { Meta, StoryObj } from "@storybook/react";
import type { JSONTableTable } from "shared/types/tableSchema";

const meta: Meta = {
  component: Table,
  title: "components/Table",
};

export default meta;

type Story = StoryObj<typeof Table>;

const exampleTable: JSONTableTable = {
  name: "follows",
  fields: [
    {
      name: "id",
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
};

export const TableStory: Story = {
  render: (props) => <Table {...props} />,
  args: {
    ...exampleTable,
  },
  parameters: {
    withKonvaWrapper: true,
  },
};
