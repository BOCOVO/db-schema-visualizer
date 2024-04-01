import Column from "./Column";

import type { Meta, StoryObj } from "@storybook/react";

import TablesInfoProvider from "@/providers/TablesInfoProvider";
import { exampleData } from "@/fake/fakeJsonTables";

const meta: Meta<typeof Column> = {
  component: Column,
  title: "components/Column",
};

export default meta;

type Story = StoryObj<typeof Column>;

export const ColumnStory: Story = {
  args: {
    colName: "username",
    type: "varchar",
  },
  parameters: {
    withKonvaWrapper: true,
  },
  render: (props) => (
    <TablesInfoProvider tables={exampleData.tables}>
      <Column {...props} />
    </TablesInfoProvider>
  ),
};
