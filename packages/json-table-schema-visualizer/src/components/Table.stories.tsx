import Table from "./Table";

import type { Meta, StoryObj } from "@storybook/react";

import TablesInfoProvider from "@/providers/TablesInfoProvider";
import { exampleData } from "@/fake/fakeJsonTables";

const meta: Meta = {
  component: Table,
  title: "components/Table",
};

export default meta;

type Story = StoryObj<typeof Table>;

export const TableStory: Story = {
  render: (props) => (
    <TablesInfoProvider tables={exampleData.tables}>
      <Table {...props} />
    </TablesInfoProvider>
  ),
  args: {
    ...exampleData.tables[0],
  },
  parameters: {
    withKonvaWrapper: true,
  },
};
